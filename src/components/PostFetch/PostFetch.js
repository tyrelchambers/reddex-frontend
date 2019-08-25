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

const PostFetch = inject("UserStore", "ModalStore", "PostStore")(observer(({UserStore, ModalStore, PostStore}) => {
  const [subreddit, setSubreddit] = useState("");
  const [ subreddits, setSubreddits ] = useState([])
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    timeframe: "day"
  });

  useEffect(() => {
    getPostsFromDatabase(setPosts);
    getSubredditsFromDatabase(setSubreddits);
  }, []);
  

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, [reloadPosts]);

  const Filters = () => posts.length > 0 ? <SubredditFilters setReloadPosts={setReloadPosts} posts={posts} setPosts={setPosts} reloadPosts={reloadPosts}/> : null
  
  return (
    <React.Fragment>
      <PostFetchComp 
        subreddit={subreddit}
        posts={posts}
        setPosts={setPosts}
        setLoading={setLoading}
        categoryOptions={categoryOptions}
        setCategoryOptions={setCategoryOptions}
        setSubreddit={setSubreddit}
        fetchPosts={fetchPosts}
        subreddits={subreddits}
        clearSelectedPosts={() => PostStore.clearSelectedPosts()}
        loading={loading}
      />
      <Filters/>
      {posts.length > 0 &&
        <p className="current-subreddit mt- w-100pr">Showing posts from <span className="highlight-text-dark">{window.localStorage.getItem('subreddit')}</span></p>
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
  posts.map(x => results.push(x.data));
  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToLocalStorage(subreddit);
  await getPostsFromDatabase(setPosts);
  return setLoading(false);  
 
}

export const saveToDatabase = async (posts) => {
  const newPosts = []; 
  posts.map(x => newPosts.push(x.data));
  
  await newPosts.map(x => {
    return window.db.posts.add({
      author: x.author,
      title: x.title,
      selftext: x.selftext,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created: x.created_utc,
      flair: x.link_flair_text,
      postId: x.id
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

const getSubredditsFromDatabase = async (setSubreddits) => {
  const db = window.db;
  const subreddits = await db.subreddits.toArray();
  return setSubreddits([...subreddits]);
}




export default PostFetch;