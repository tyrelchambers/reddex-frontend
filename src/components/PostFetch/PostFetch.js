import React, { useState, useEffect } from 'react';
import './PostFetch.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import dateFns from 'date-fns';
import moment from 'moment'
import Dexie from 'dexie';

const PostFetch = (props) => {
  const [subreddit, setSubreddit] = useState(window.sessionStorage.getItem('subreddit') ? window.sessionStorage.getItem('subreddit') : "");
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
    if ( window.db ) return;
    const db = new Dexie("Reddex");
    window.db = db;
    db.version(1).stores({
      posts: "++id, author, title, selftext, ups, url, num_comments, created_at"
    });
  }, []);

  useEffect(() => {
    getPostsFromDatabase(setPosts);
  }, [reloadPosts]);

  return (
    <section className="w-100pr">
      <div className="d-f header">
        <div className="d-f ai-c w-100pr">
          <input type="text" className="input mr-" placeholder="subreddit" onChange={(e) => setSubreddit(e.target.value)}/>
          <input type="number" className="input mr-" placeholder="# of posts to return (max 100)" max="100" onChange={(e) => setCount(e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setLoading("Fetching posts...");
          fetchPosts(subreddit, setPosts, setLoading, count);
          setReloadPosts(!reloadPosts);
        }}><i className="fas fa-sync"></i> Get Posts</button>
      </div>

      {posts.length > 0 &&
        <div className="filters-wrapper d-f mt+ w-100pr">
          <div className="d-f w-100pr ai-c">
            <div className="select">
              <select name="threshold" id="threshSelect" onChange={(e) => operator = e.target.value}>
                <option value=">" >greater than</option>
                <option value="<" >less than</option>
                <option value="===" >equal to</option>
              </select>
              <div className="select__arrow"></div>
            </div>
            
            <input type="number" className="input ml-" placeholder="Upvote Count (default: 0)" onChange={e => setPendingFilters({upvotes: e.target.value})}/>
            <input type="text" className="input ml-" placeholder="keywords separated by commas" onChange={(e) => setKeywords(e.target.value)}/>

          </div>

          {/* <button className="btn btn-tiertiary" onClick={() => setFilterOptions({seriesOnly: true})}>Series Only</button> */}

          <button className="btn btn-tiertiary" onClick={() => {
            resetFilters(setFilterOptions);
            setReloadPosts(!reloadPosts);
          }}>Reset Filters</button>
          <button className="btn btn-secondary ml-" onClick={() => {
            
            setFilterOptions({...filterOptions, ...pendingFilters});
            formatPosts(pendingFilters.upvotes, posts, operator, setPosts);
          }}>Apply Filters</button>
        </div>
      }

      {subreddit &&
        <p className="current-subreddit">Showing posts from <span className="highlight-text">{subreddit}</span></p>
      }

      <div>        
        {loading &&
          <Loading />
        }

        {(posts.length > 0 && !loading) && 
          <ul className="post-list d-f ">
            {posts.slice(0, filterOptions.upvotes > 0 ? posts.length - 1 : 40).map((x, id) => {
              return(
                <li key={id} className="d-f fxd-c  post">
                  <div className="d-f fxd-c w-100pr">
                    <h1 className=" upvotes">
                      <i className="fas fa-arrow-circle-up"></i>  {x.ups}
                    </h1>
                    <p className="title mt+ mb+ ml- mr-">{x.title}</p>
                    <p className="author m-- ml-"><i className="fas fa-user mr-"></i> Written by {x.author}</p>
                    <p className="comments m-- ml-"><i className="fas fa-comment-alt mr-"></i> {x.num_comments} Comments</p>
                  </div>
                  <div className="d-f ai-c d-f ">
                    <p className="publish-tag"> <i className="fas fa-history mr- m-- ml-"></i> published {dateFns.distanceInWordsToNow(moment.unix(x.created_at)._d)} ago</p>
                  </div>
                  <div className="d-f m- js-fe">
                    <a href={x.url} className="link" target="_blank">View</a>

                  </div>
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

const fetchPosts = async (subreddit, setPosts, setLoading, count) => {
  const sr = subreddit.replace(/\s/g, '').trim();
  const link = `https://www.reddit.com/r/${sr}.json?limit=100`;
  let posts = [];
  let after = ``;
  if ( !sr || sr.length <= 0 ) return alert("Must include a subreddit");

  for ( let i = 0; (i < 10 && after !== null); i++ ) {
    await Axios.get(`${link}&after=${after}`).then(res => {
      after = res.data.data.after;
      posts = [...posts, ...res.data.data.children];
    }).catch(err => err);
  }

  setLoading("");

  posts.shift();
  deletePostsCollection();
  saveToDatabase(posts);
  saveSubredditToSessionStorage(subreddit);
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