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


const PostFetch = inject("UserStore", "ModalStore", "PostStore")(observer(({UserStore, ModalStore, PostStore}) => {
  const [loading, setLoading] = useState(false);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    timeframe: "day"
  });
  const [ filterOptions, setFilterOptions ] = useState({
    seriesOnly: false,
    upvotes: 0,
    operator: ">",
    omitSeries: false,
    keywords: ""
  });
  const [ usedPosts, setUsedPosts ] = useState([]);
  const [ endIndex, setEndIndex ] = useState(100);

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    document.addEventListener('scroll', infiniteScroll);
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
    return () => {
      document.removeEventListener('scroll', infiniteScroll);
    };
  }, [])

  
  // useEffect(() => {
  //   const fn = async () => {
  //     const saved = await getPostsFromDatabase();
  //     PostStore.setPosts(saved)
  //   }

  //   fn();
  // }, [reloadPosts]);


  const infiniteScroll = async () => {
    const list = document.querySelector('.post-list');

    if ( isInViewport(list) ) {
      
      await getPostsFromDatabase({skip: endIndex - 100}).then(res => {
        PostStore.setPosts([...PostStore.posts, ...res])
        setEndIndex(endIndex + 100);
      });
      
    }
  }
  
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
  
  const getPostsFromDatabase = async ({
    limit = 100,
    skip = 0
  } = {}) => {

    const posts = await getAxios({
      url: '/posts/',
      params: {
        limit,
        skip,
        ...(filterOptions.upvotes > 0 && {
          upvotes: filterOptions.upvotes,
          operator: filterOptions.operator
        }),
        ...(filterOptions.keywords && {keywords: filterOptions.keywords})
        
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
    return posts;
  }
  
  const fetchPosts = async (subreddit, setLoading, category) => {
    const sr = subreddit.replace(/\s/g, '').trim().toLowerCase();
    if ( !sr || sr.length === 0 ) return alert("Must include a subreddit");
  
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

  return (
    <React.Fragment>
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
            setReloadPosts={setReloadPosts} 
            reloadPosts={reloadPosts}
            filterOptions={filterOptions}
            setFilterOptions={setFilterOptions}  
            getPostsFromDatabase={getPostsFromDatabase}
          />
        }

      </div>
      
      {UserStore.getUser() &&
        <RecentlySearched
          executeFetch={executeFetch}
        />
      }
        <HR />

      {(PostStore.selectedPosts.length > 0 && UserStore.getUser()) &&
        <MessageAuthors data={PostStore.selectedPosts} posts={PostStore.posts} />
      }

      {loading &&
        <Loading title="Wrangling reddit posts..." subtitle="This will take a minute or two, hold tight"/>
      }

      {PostStore.posts.length === 0 &&
        <p className="subtle">No Reddit posts found...</p>
      }
      {!loading &&
        <ul className="post-list mt+">

          {PostStore.posts.sort((a, b) => {
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

      {ModalStore.isOpen && 
        <ConfirmModal />
      }
    </React.Fragment>
  );
  
}));


var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.bottom <= ((window.innerHeight + 200))
  );
};

 const selectPost = (x, PostStore) => {
  PostStore.setSelectedPosts(x);
}
export default PostFetch;