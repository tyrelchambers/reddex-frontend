import React, { useState, useEffect } from 'react';
import './PostFetch.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import dateFns from 'date-fns';
import moment from 'moment'
import SubredditFilters from '../SubredditFilters/SubredditFilters';
import SubredditPost from '../SubredditPost/SubredditPost';

const PostFetch = (props) => {
  const [subreddit, setSubreddit] = useState("");
  const [ posts, setPosts ] = useState([]);
  const [loading, setLoading] = useState("");
  const [ count, setCount ] = useState(100);
  const [ reloadPosts, setReloadPosts ] = useState(false);
  const [ keywords, setKeywords ] = useState("");
  const [ filterOptions, setFilterOptions ] = useState({
    seriesOnly: false,
    upvotes: 0
  });
  
  const [ pendingFilters, setPendingFilters ] = useState({
    upvotes: 0,
    seriesOnly: false
  });

  let operator = ">";

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, []);

  return (
    <section className="w-100pr">
      <div className="d-f header">
        <div className="d-f ai-c w-100pr">
          <input type="text" className="input mr-" placeholder="subreddit" onChange={(e) => setSubreddit(e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setLoading("Fetching posts...");
          fetchPosts(subreddit, setLoading, setPosts);
          setReloadPosts(!reloadPosts);
          console.log('get posts');
        }}><i className="fas fa-sync"></i> Get Posts</button>
      </div>

      {posts.length > 0 &&
        <SubredditFilters 
          operator={operator}
          setPendingFilters={setPendingFilters}
          setKeywords={setKeywords}
          resetFilters={resetFilters}
          setReloadPosts={setReloadPosts}
          filterOptions={filterOptions}
          pendingFilters={pendingFilters}
          posts={posts}
          setPosts={setPosts}
          setFilterOptions={setFilterOptions}
          formatPosts={formatPosts}
          reloadPosts={reloadPosts}
        />
      }

      {subreddit &&
        <p className="current-subreddit">Showing posts from <span className="highlight-text">{subreddit}</span></p>
      }

      <div>        
        {loading &&
          <Loading />
        }

        {console.log('Render') }

        {(posts.length > 0 && !loading) && 
          <ul className="post-list d-f ">
            {posts.slice(0, filterOptions.upvotes > 0 ? posts.length - 1 : 40).map((x, id) => {
              return(
                <li key={id} className="d-f fxd-c  post">
                  <SubredditPost 
                    x={x}
                    concatTitle={concatTitle}
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

const keywordSearch = (data, posts, setPosts) => {
  const keywords = data.split(", ");
  let results;
  for ( let i = 0; i < keywords.length; i++ ) {
    let postsTitle = posts.filter(x => x.data.title.toLowerCase().includes(keywords[i].toLowerCase()));
    let postsBody = posts.filter(x => x.data.selftext.toLowerCase().includes(keywords[i].toLowerCase()));
    let set = new Set([...postsTitle, ...postsBody]);
    results = [...set];
  }

  return setPosts([...results]);
}

const concatTitle = data => {
  const str = data.split('').slice(0, 40).join("");
  return data.length > 40 ? str + "..." : data;
}

const saveSubredditToSessionStorage = data => {
  return window.sessionStorage.setItem(`subreddit`, data);
}

const seriesOnly = (data, setPosts) => {
  const posts = data.filter(x => x.data.link_flair_text === "Series");
  return setPosts([...posts]);
}

const formatPosts = (upvoteCount = 0, posts, operator, setPosts) => {
  const op = operator;

  if ( op === ">") {
    let newPosts = posts.filter(x => x.ups > upvoteCount);
    return setPosts([...newPosts]);
  };

  if ( op === "<") {
    let newPosts = posts.filter(x => x.ups < upvoteCount);
    return setPosts([...newPosts]);
  };

  if ( op === "===") {
    let newPosts = posts.filter(x => x.ups == upvoteCount);
    return setPosts([...newPosts]);
  };
}

const fetchPosts = async (subreddit, setLoading, setPosts) => {
  const sr = subreddit.replace(/\s/g, '').trim();
  const link = `https://www.reddit.com/r/${sr}.json?limit=100`;
  let posts = [];
  let after = ``;
  
  if ( !sr || sr.length === 0 ) return alert("Must include a subreddit");

  for ( let i = 0; (i < 10 && after !== null); i++ ) {
    await Axios.get(`${link}&after=${after}`).then(res => {
      after = res.data.data.after;
      posts = [...posts, ...res.data.data.children];
    }).catch(err => err);
  }
  posts.shift();
  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToSessionStorage(subreddit);
  setLoading("");

}

const saveToDatabase = async (posts) => {
  const newPosts = []; 
  posts.map(x => newPosts.push(x.data));

  await newPosts.map(x => {
    window.db.posts.add({
      author: x.author,
      title: x.title,
      selftext: x.selftext,
      ups: x.ups,
      url: x.url,
      num_comments: x.num_comments,
      created_at: x.created_utc,
      flair: x.link_flair_text
    });
  });
}

const getPostsFromDatabase = async (setPosts) => {
  const db = window.db;
  const posts = await db.posts.toArray();
  console.log('Get from DB');
  return setPosts([...posts]);
}

const deletePostsCollection = () => {
  const db = window.db;
  db.posts.clear().then().catch();
}

const resetFilters = (setFilterOptions) => {
  return setFilterOptions({
    upvotes: 0,
    seriesOnly: false
  });
}

export default PostFetch;