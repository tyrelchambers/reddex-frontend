import React, { useState, useEffect } from 'react';
import '../PostFetchComp/PostFetchComp.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import SubredditFilters from '../SubredditFilters/SubredditFilters';
import MessageAuthors from '../MessageAuthors/MessageAuthors';
import PostFetchComp from '../PostFetchComp/PostFetchComp';
import { inject, observer } from 'mobx-react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import RecentlySearched from '../../layouts/RecenlySearched/RecentlySearched';
import {getAxios} from '../../api/index'
import HR from '../HR/HR';
import SubredditPost from '../SubredditPost/SubredditPost';
import { toast } from 'react-toastify';


const PostFetch = inject("UserStore", "ModalStore", "PostStore")(observer(({UserStore, ModalStore, PostStore}) => {
  const [loading, setLoading] = useState(false);
  const [refetch, setRefetch] = useState(false)
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    timeframe: "day"
  });
  const [ filterOptions, setFilterOptions ] = useState({
    seriesOnly: false,
    upvotes: 0,
    operator: "",
    omitSeries: false,
    keywords: ""
  });
  const [fetching, setFetching] = useState(false)
  const [ usedPosts, setUsedPosts ] = useState([]);
  const [ nextPage, setNextPage ] = useState(2)
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);

    return () => {
      window.removeEventListener('scroll', infiniteScroll);
    };
  }, [fetching, nextPage])

  useEffect(() => {
    
    if( token ) {
     const fn = async () => {
       await getAxios({
         url: '/profile/stories_used'
       }).then(res => {
         if ( res ) {
           setUsedPosts([...res])
         }
       });
     }
     
     fn();
   }

 }, [])
 

 useEffect(() => {
  const vToken = window.localStorage.getItem("visitorToken");
  const fn = async () => {
    
    if (vToken) {
      await getPostsFromDatabase().then(res => {
        if(res) {
          
          PostStore.setPosts(res.posts)
        }
      });
    }
  }

  fn()

 }, [refetch])

  const infiniteScroll = async () => {
    const list = document.querySelector('.App');
    if (fetching) return;

    if ( isInViewport(list) && nextPage !== -1) {
      setFetching(true)

      await getPostsFromDatabase(nextPage).then(res => {
        PostStore.setPosts([...PostStore.posts, ...res.posts])    
        setNextPage(res.nextPage)
        setFetching(false)
      });
    }
  }

  var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (bounding.bottom <= window.innerHeight + 250);
  };
  
  const isPostUsed = (post) => {
    for (let i = 0; i < usedPosts.length; i++ ) {
      if (usedPosts[i].post_id === post.post_id) {
        return true;
      }
    }
  }


  const executeFetch = () => {
    if (!PostStore.subreddit) return;
    setLoading(true);
    recentlySearched(PostStore.subreddit)
    fetchPosts(PostStore.subreddit, setLoading, categoryOptions);
    PostStore.clearSelectedPosts()
  }

  const recentlySearched = (subreddit) => {
    getAxios({
      url: '/recently_searched',
      method: 'post',
      data: {
        subreddit
      }
    })
  }

  const saveToDatabase = async (posts) => {
    getAxios({
      url: '/posts/save',
      method: "post",
      data: posts,
      options: {
        withToken: false,
        withVisitorToken: true
      }
    }).then(res => {
      if (res) {
        PostStore.setPosts(res)
      }
    })
    return true;
  }
  
  const getPostsFromDatabase = async (page) => {
    return await getAxios({
      url: '/posts/',
      params: {
        page,
        ...((filterOptions.upvotes > 0 && filterOptions.operator )&& {
          upvotes: filterOptions.upvotes,
          operator: filterOptions.operator
        }),
        ...(filterOptions.keywords && {keywords: filterOptions.keywords}),
        ...(filterOptions.seriesOnly && {seriesOnly: filterOptions.seriesOnly}),
        ...(filterOptions.excludeSeries && {excludeSeries: filterOptions.excludeSeries})
        
      },
      options: {
        withToken: false,
        withVisitorToken: true
      }
    }).then(res => {
      if (res) {
        return res
      }
    })

  }
  
  const fetchPosts = async (subreddit, setLoading, category) => {
    const sr = subreddit.replace(/\s/g, '').trim().toLowerCase();
    if ( !sr || sr.length === 0 ) return alert("Must include a subreddit");
    
    window.localStorage.setItem("subreddit", sr)

    let endpoint = "";
    
    if ( category !== "hot" ) {
      endpoint = `${sr}/${category.category}.json?limit=100`;
    } 
    
    if ( category.timeframe !== "day") {
      endpoint = `${sr}/${category.category}/.json?t=${category.timeframe}`;
    }
  
    const link = `https://www.reddit.com/r/${endpoint}`;
    let posts = [];
    let after = ``;
    const results = []; 
  
    for ( let i = 0; (i < 10 && after !== null); i++ ) {
      await Axios.get(`${link}&after=${after}`).then(res => {
        after = res.data.data.after;
        posts = [...posts, ...res.data.data.children];
      }).catch(err => err);
    }
  
  
    posts.shift();
    posts.map(x => {
      const newObj = {
        author: x.data.author,
        title: x.data.title,
        self_text: x.data.selftext,
        ups: x.data.ups,
        url: x.data.url,
        num_comments: x.data.num_comments,
        created: x.data.created_utc,
        link_flair_text: x.data.link_flair_text,
        post_id: x.data.id,
        subreddit: x.data.subreddit,
        upvote_ratio: x.data.upvote_ratio
      };
  
      results.push(newObj)
    });
  
    saveToDatabase([...results]);

    return setLoading(false);  
   
  }

  const filter = async () => {

    if (filterOptions.upvotes && !filterOptions.operator) {
      return toast.error("No operator selected")
    }
    setLoading(true)
    await getPostsFromDatabase().then(res => {
      PostStore.setPosts([...res.posts])
      setNextPage(res.nextPage)
      setLoading(false)
    })
  }

  return (
    <div className="post-fetch-wrapper">
      <div className="fetch-inputs w-100pr">
        <PostFetchComp 
          setLoading={setLoading}
          categoryOptions={categoryOptions}
          setCategoryOptions={setCategoryOptions}
          executeFetch={executeFetch}
          loading={loading}
        />
        {(!loading) &&
          <SubredditFilters 
          refetch={refetch}
            setRefetch={setRefetch}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}  
            getPostsFromDatabase={getPostsFromDatabase}
            filter={filter}
          />
        }

      </div>

      {UserStore.getUser() &&
        <RecentlySearched
          executeFetch={executeFetch}
        />
      }
        <HR />

      {window.localStorage.getItem("subreddit") && <p className="subtle">Showing posts from <strong>{window.localStorage.getItem("subreddit")}</strong> </p>}

      {(PostStore.selectedPosts.length > 0 && UserStore.getUser()) &&
        <MessageAuthors data={PostStore.selectedPosts} posts={PostStore.posts} />
      }

      {loading &&
        <Loading title="Wrangling reddit posts..." subtitle="This will take a minute or two, hold tight"/>
      }

      {!loading &&
        <ul className="post-list mt+">

          {PostStore.posts.slice().sort((a, b) => {
            return b.created - a.created
          }).map((x, id) => {
            return(
              <SubredditPost
              key={id}
                x={x}
                onClickHandler={() => selectPost(x, PostStore)}
                used={isPostUsed(x)}
              />
            )
          })}
        </ul>    
      }

      {fetching && 
         <Loading  subtitle="Fetching next page..."/>

      }
 
      {ModalStore.isOpen && 
        <ConfirmModal />
      }
    </div>
  );
  
}));




 const selectPost = (x, PostStore) => {
  PostStore.setSelectedPosts(x);
}
export default PostFetch;