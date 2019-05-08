import React, { useState, useEffect } from 'react';
import './PostFetch.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import SubredditFilters from '../SubredditFilters/SubredditFilters';
import SubredditPost from '../SubredditPost/SubredditPost';

const PostFetch = (props) => {
  const [subreddit, setSubreddit] = useState(window.sessionStorage.getItem('subreddit') ? window.sessionStorage.getItem('subreddit') : "");
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    top: ""
  });

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, []);

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, [reloadPosts]);

  return (
    <section className="w-100pr">
      <div className="d-f header">
        <div className="d-f ai-c w-100pr">
          <input type="text" className="input mr-" placeholder="subreddit" onChange={(e) => setSubreddit(e.target.value)}/>
          <div className="select mr-">
            <select name="threshold" id="threshSelect" onChange={(e) => setCategoryOptions({...categoryOptions, category: e.target.value})}>
              <option value="hot" defaultValue>Hot</option>
              <option value="new" >New</option>
              <option value="controversial" >Controversial</option>
              <option value="top" >Top</option>
              <option value="rising" >Rising</option>
            </select>
            <div className="select__arrow"></div>
          </div>

          <SubSelect
            setCategoryOptions={setCategoryOptions}
            categoryOptions={categoryOptions}
          />
        </div>
        <button className="btn btn-primary" onClick={() => {
          setLoading(true);
          fetchPosts(subreddit, setLoading, setPosts, categoryOptions);
        }}><i className="fas fa-sync"></i> Get Posts</button>
      </div>

      {posts.length > 0 &&
        <SubredditFilters 
          setReloadPosts={setReloadPosts}
          posts={posts}
          setPosts={setPosts}
          reloadPosts={reloadPosts}
        />
      }

      {subreddit &&
        <p className="current-subreddit mt-">Showing posts from <span className="highlight-text">{subreddit}</span></p>
      }

      <div>        
        {loading &&
          <Loading />
        }

        { (posts.length > 0 && !loading ) && 
          <ul className="post-list d-f ">
            {posts.slice(0, 40).map((x, id) => {
              return(
                <li key={id} className="d-f fxd-c  post">
                  <SubredditPost 
                    x={x}
                    setPosts={setPosts}
                  />
                </li>
              )
            })}
          </ul>
        }
      </div>
    </section>
  );
  
}

const SubSelect = ({ categoryOptions, setCategoryOptions }) => {
  if ( categoryOptions.category === "top" ) {
    return (
      <div className="select mr-">
        <select name="threshold" id="threshSelect" onChange={(e) => setCategoryOptions({...categoryOptions, top: e.target.value})}>
          <option value="pastHour">Past Hour</option>
          <option value="past24Hours" selected>Past 24 Hours</option>
          <option value="pastWeek" >Past Week</option>
          <option value="pastMonth" >Past Month</option>
          <option value="pastYear" >Past Year</option>
          <option value="ofAllTime" >Of All Time</option>

        </select>
        <div className="select__arrow"></div>
      </div>
    );
  } 
  return null;
}

const saveSubredditToSessionStorage = data => {
  return window.sessionStorage.setItem(`subreddit`, data);
}

const fetchPosts = async (subreddit, setLoading, setPosts, category) => {
  const sr = subreddit.replace(/\s/g, '').trim();
  const endpoint = category.category === "hot" ? `${sr}` : `${sr}/${category.category}`;
  const link = `https://www.reddit.com/r/${endpoint}.json?limit=100`;
  let posts = [];
  let after = ``;
  const results = []; 
  if ( !sr || sr.length === 0 ) return alert("Must include a subreddit");

  for ( let i = 0; (i < 10 && after !== null); i++ ) {
    await Axios.get(`${link}&after=${after}`).then(res => {
      after = res.data.data.after;
      posts = [...posts, ...res.data.data.children];
    }).catch(err => err);
  }

  posts.map(x => results.push(x.data));
  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToSessionStorage(subreddit);
  await setPosts([...results]);
  return setLoading(false);
}

const saveToDatabase = async (posts) => {
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
      created: x.created,
      flair: x.link_flair_text
    });
  });
}

const getPostsFromDatabase = async (setPosts) => {
  const db = window.db;
  const posts = await db.posts.toArray();
  return setPosts([...posts]);
}

const deletePostsCollection = () => {
  const db = window.db;
  db.posts.clear().then().catch();
}




export default PostFetch;