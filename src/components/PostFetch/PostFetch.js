import React, { useState, useEffect, useContext } from 'react';
import './PostFetch.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import SubredditFilters from '../SubredditFilters/SubredditFilters';
import SubredditPost from '../SubredditPost/SubredditPost';
import MessageAuthors from '../MessageAuthors/MessageAuthors';
import UserStore from '../../stores/UserStore';

const PostFetch = (props) => {
  const [subreddit, setSubreddit] = useState(window.localStorage.getItem('subreddit') ? window.localStorage.getItem('subreddit') : "");
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ selectedPosts, setSelectedPosts ] = useState([]);
  const userStore = useContext(UserStore);
  const [ categoryOptions, setCategoryOptions ] = useState({
    category: "hot",
    timeframe: ""
  });

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, []);

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, [reloadPosts]);

  return (
    <section className="w-100pr">
      <div className="d-f post-fetch-header">
        <div className="d-f ai-c w-100pr mobile-fetch-inputs">
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
          setSelectedPosts([]);
        }}><i className="fas fa-sync"></i> Get Posts</button>
      </div>

      {subreddit &&
        <SubredditFilters 
          setReloadPosts={setReloadPosts}
          posts={posts}
          setPosts={setPosts}
          reloadPosts={reloadPosts}
        />
      }
      
      {subreddit &&
        <p className="current-subreddit mt-">Showing posts from <span className="highlight-text">{subreddit || window.localStorage.getItem('subreddit')}</span></p>
      }

      {(selectedPosts.length > 0 && userStore.getUser()) &&
        <MessageAuthors 
          data={selectedPosts}
          posts={posts}
        />
      } 


      <div>        
        {loading &&
          <Loading />
        }

        { (posts.length > 0 && !loading ) && 
          <ul className="post-list d-f ">
            {posts.slice(0, 40).map(x => {
              return(
                <li 
                  key={x.id} 
                  className={`d-f fxd-c subreddit-post-parent post ${selectedPosts.includes(x.id.toString()) ? "active-post-select" : ""}`} 
                  data-id={x.id}
                  
                >
                  <SubredditPost 
                    x={x}
                    setPosts={setPosts}
                    onSelect={(e) => selectPost(e, selectedPosts, setSelectedPosts)}
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

export const selectPost = (e, selectedPosts, setSelectedPosts) => {
  const trg = e.target.closest(".subreddit-post-parent");
  const post = trg.getAttribute('data-id');
  let results = [...selectedPosts];

  if (results.includes(post.toString())) {
    results.splice(selectedPosts.indexOf(post), 1); 
  } else {
    results.push(post);
  }

  setSelectedPosts([...results]);
}

export const SubSelect = ({ categoryOptions, setCategoryOptions }) => {
  if ( categoryOptions.category === "top" || categoryOptions.category === "controversial" ) {
    return (
      <div className="select mr-">
        <select name="threshold" id="threshSelect" onChange={(e) => setCategoryOptions({...categoryOptions, timeline: e.target.value})}>
          <option value="hour">Past Hour</option>
          <option value="day" selected>Past 24 Hours</option>
          <option value="week" >Past Week</option>
          <option value="month" >Past Month</option>
          <option value="year" >Past Year</option>
          <option value="all" >Of All Time</option>

        </select>
        <div className="select__arrow"></div>
      </div>
    );
  } 
  return null;
}

export const saveSubredditToLocalStorage = data => {
  return window.localStorage.setItem(`subreddit`, data);
}

export const fetchPosts = async (subreddit, setLoading, setPosts, category) => {
  const sr = subreddit.replace(/\s/g, '').trim();
  let endpoint = "";

  if ( category !== "hot" ) {
    endpoint = `${sr}/${category.category}.json?limit=100`;
  } 
  
  if ( category.timeline ) {
    endpoint = `${sr}/${category.category}/.json?t=${category.timeline}`;
  }

  const link = `https://www.reddit.com/r/${endpoint}`;
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

  posts.shift();
  posts.map(x => results.push(x.data));
  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToLocalStorage(subreddit);
  await setPosts([...results]);
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
      created: x.created,
      flair: x.link_flair_text
    });
  });
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