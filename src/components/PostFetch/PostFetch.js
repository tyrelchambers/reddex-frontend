import React, { useState, useEffect } from 'react';
import '../PostFetchComp/PostFetchComp.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import SubredditFilters from '../SubredditFilters/SubredditFilters';
import MessageAuthors from '../MessageAuthors/MessageAuthors';
import PostFetchComp from '../PostFetchComp/PostFetchComp';
import Posts from '../Posts/Posts';
import { inject, observer } from 'mobx-react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import RecentlySearched from '../../layouts/RecenlySearched/RecentlySearched';
import {getAxios} from '../../api/index'
import HR from '../HR/HR';

const PostFetch = inject("UserStore", "ModalStore", "PostStore")(observer(({UserStore, ModalStore, PostStore}) => {
  const [loading, setLoading] = useState(false);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    timeframe: "day"
  });
  
  useEffect(() => {
    const fn = async () => {
      const saved = await getPostsFromDatabase();
      PostStore.setPosts(saved)
    }

    fn();
  }, [reloadPosts]);

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
        skip
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

    PostStore.setPosts(results);
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
        {(PostStore.posts.length > 0 && !loading) &&
          <SubredditFilters setReloadPosts={setReloadPosts} reloadPosts={reloadPosts}/>
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

      <Posts 
        posts={PostStore.posts}
        loading={loading}
        setPosts={PostStore.setPosts}
        getPostsFromDatabase={getPostsFromDatabase}
      />
      {ModalStore.isOpen && 
        <ConfirmModal />
      }
    </React.Fragment>
  );
  
}));

export default PostFetch;