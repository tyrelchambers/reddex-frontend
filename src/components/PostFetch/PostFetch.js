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

const PostFetch = inject("UserStore", "ModalStore", "PostStore")(observer(({UserStore, ModalStore, PostStore}) => {
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    timeframe: "day"
  });
  
  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, []);

  useEffect(() => {
    collCount();
  })

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, [reloadPosts]);
  
  const collCount = async () => {
    const _ = await window.db.posts.count().then();
    return PostStore.setCollectionCount(_);
  }

  const executeFetch = () => {
    if (!PostStore.subreddit) return;
    setLoading(true);
    recentlySearched(PostStore.subreddit)
    fetchPosts(PostStore.subreddit, setLoading, setPosts, categoryOptions);
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
  

  return (
    <React.Fragment>
      <div className="fetch-inputs w-100pr">
        <PostFetchComp 
          posts={posts}
          setPosts={setPosts}
          setLoading={setLoading}
          categoryOptions={categoryOptions}
          setCategoryOptions={setCategoryOptions}
          fetchPosts={fetchPosts}
          executeFetch={executeFetch}
        />
        {((PostStore.collectionCount || posts.length) > 0 && !loading) &&
          <SubredditFilters setReloadPosts={setReloadPosts} posts={posts} setPosts={setPosts} reloadPosts={reloadPosts}/>
        }

      </div>
      
      {UserStore.getUser() &&
        <RecentlySearched
          executeFetch={executeFetch}
        />
      }

      {(PostStore.selectedPosts.length > 0 && UserStore.getUser()) &&
        <MessageAuthors data={PostStore.selectedPosts} posts={posts} />
      }

      {loading &&
        <Loading title="Wrangling reddit posts..." subtitle="This will take a minute or two, hold tight"/>
      }

      <Posts 
        posts={posts}
        loading={loading}
        setPosts={setPosts}
      />
      {ModalStore.isOpen && 
        <ConfirmModal />
      }
    </React.Fragment>
  );
  
}));



export const saveSubredditToLocalStorage = data => {
  return window.localStorage.setItem(`subreddit`, data);
}

export const fetchPosts = async (subreddit, setLoading, setPosts, category) => {
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
    const newObj = {...x};
    newObj.data.post_id = newObj.data.id;
    newObj.data.self_text = newObj.data.selftext
    delete newObj.data.id;
    delete newObj.data.selftext;
    results.push(newObj.data)
  });

  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToLocalStorage(subreddit);
  setPosts([...results]);
  return setLoading(false);  
 
}

export const saveToDatabase = async (posts) => {
  const newPosts = []; 
  posts.map(x => newPosts.push(x.data));
  
  await newPosts.map(x => {
    return window.db.posts.add({
      author: x.author,
      title: x.title,
      self_text: x.self_text,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created: x.created_utc,
      link_flair_text: x.link_flair_text,
      post_id: x.post_id,
      subreddit: x.subreddit
    });
  });
  return true;
}

export const getPostsFromDatabase = async (setPosts) => {
  const db = window.db;
  const posts = await db.posts.toArray();
  return setPosts([...posts]);
}

export const deletePostsCollection = () => {
  const db = window.db;
  db.posts.clear().then().catch();
}





export default PostFetch;