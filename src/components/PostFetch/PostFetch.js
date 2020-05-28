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
import Pagination from '@material-ui/lab/Pagination';


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
    keywords: "",
    readTime: 0,
    readTimeOperator: ""
  });
  const [fetching, setFetching] = useState(false)
  const [ usedPosts, setUsedPosts ] = useState([]);
  const [ maxPages, setMaxPages ] = useState();
  const token = window.localStorage.getItem('token');

  useEffect(() => {
    const vToken = window.localStorage.getItem("visitorToken");

    if( token ) {
     const fn = async () => {
       await getAxios({
         url: '/profile/stories_used'
       }).then(res => {
         if ( res ) {
           setUsedPosts([...res])
         }
       });

       if (vToken) {
        await getPostsFromDatabase().then(res => {
          if(res) {
            setMaxPages(res.maxPages)
            PostStore.setPosts(res.posts)
          }
        });
      }
     }
     
     fn();
   }

 }, [refetch])
  
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
        PostStore.setPosts(res.posts)
        setMaxPages(res.maxPages)
        return setLoading(false);  
      }
    })
    return true;
  }
  
  const getPostsFromDatabase = async (page) => {

    const query = {
      ...((filterOptions.upvotes > 0 && filterOptions.operator )&& {
        upvotes: filterOptions.upvotes,
        operator: filterOptions.operator
      }),
      ...((filterOptions.readTime > 0 && filterOptions.readTimeOperator )&& {
        readTime: filterOptions.readTime,
        readTimeOperator: filterOptions.readTimeOperator
      }),
      ...(filterOptions.keywords && {keywords: filterOptions.keywords}),
      ...(filterOptions.seriesOnly && {seriesOnly: filterOptions.seriesOnly}),
      ...(filterOptions.excludeSeries && {excludeSeries: filterOptions.excludeSeries})
    }

    return await getAxios({
      url: '/posts/',
      params: {
        page,
        ...query
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
  
  const fetchPosts = async (subreddit, category) => {
    PostStore.setPosts([])
    setFetching(true)
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
    
    await saveToDatabase([...results])
   
  }

  const filter = async () => {

    if (filterOptions.upvotes && !filterOptions.operator) {
      return toast.error("No operator selected")
    }
    setLoading(true)
    await getPostsFromDatabase().then(res => {
      PostStore.setPosts(res.posts)
      setMaxPages(res.maxPages)
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
      {window.localStorage.getItem("subreddit") && <p className="subtle mb+">Showing posts from <strong>{window.localStorage.getItem("subreddit")}</strong> </p>}

      {(PostStore.selectedPosts.length > 0 && UserStore.getUser()) &&
        <MessageAuthors data={PostStore.selectedPosts} posts={PostStore.posts} />
      }

      {loading &&
        <Loading title="Wrangling reddit posts..." subtitle="This will take a minute or two, hold tight"/>
      }

      {!loading &&
        <div className="d-f pagination-post-wrapper">
          <Pagination 
            count={maxPages}
            shape="rounded"
            onChange={(e, page) => {
              getPostsFromDatabase(page).then(res => {
                PostStore.setPosts(res.posts)    
              });
            }}
          />

            <ul className="post-list">

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
        </div>
      }

      {(fetching && !loading) && 
         <Loading  subtitle="Fetching next page..."/>

      }

      {(!PostStore.posts.length && !loading && !fetching) && <p className="subtle ta-c ml-a mr-a">No posts found...</p>}
      
      

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