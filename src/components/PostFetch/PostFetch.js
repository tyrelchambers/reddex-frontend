import React, { useState } from 'react';
import './PostFetch.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';
import dateFns from 'date-fns';
import moment from 'moment'
const PostFetch = (props) => {
  const [subreddit, setSubreddit] = useState(window.sessionStorage.getItem('subreddit') ? window.sessionStorage.getItem('subreddit') : "");
  const [ posts, setPosts ] = useState(window.sessionStorage.getItem('posts') ? [...JSON.parse(window.sessionStorage.getItem('posts'))] : "");
  const [loading, setLoading] = useState("");
  const [ count, setCount ] = useState(100);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [operator, setOperator] = useState(">");
  const [ keywords, setKeywords ] = useState("");
  const [ filterOptions, setFilterOptions ] = useState({
    seriesOnly: false
  });
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
        }}><i className="fas fa-sync"></i> Get Posts</button>
      </div>
      
      {posts.length > 0 &&
        <div className="filters-wrapper d-f mt+ w-100pr">
          <div className="d-f w-100pr ai-c">
            <div className="select">
              <select name="threshold" id="threshSelect" onChange={(e) => setOperator(e.target.value)}>
                <option value=">" >greater than</option>
                <option value="<" >less than</option>
                <option value="===" >equal to</option>
              </select>
              <div className="select__arrow"></div>
            </div>
            
            <input type="number" className="input ml-" placeholder="Upvote Count (default: 0)" onChange={(e) => setUpvoteCount(e.target.value)}/>
            <input type="text" className="input ml-" placeholder="keywords separated by commas" onChange={(e) => setKeywords(e.target.value)}/>

          </div>

          {/* <button className="btn btn-tiertiary" onClick={() => setFilterOptions({seriesOnly: true})}>Series Only</button> */}

          <button className="btn btn-tiertiary" onClick={() => {
            setPosts([...JSON.parse(window.sessionStorage.getItem('posts'))]);
          }}>Reset Filters</button>
          <button className="btn btn-secondary ml-" onClick={() => {

            if (upvoteCount.length > 0) formatPosts(upvoteCount, posts, operator, setPosts);
            if (keywords.length > 0) keywordSearch(keywords, posts, setPosts);

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
            {posts.map((x, id) => {
              return(
                <li key={id} className="d-f fxd-c  post">
                  <div className="d-f fxd-c w-100pr">
                    <h1 className=" upvotes">
                      <i className="fas fa-arrow-circle-up"></i>  {x.data.ups}
                    </h1>
                    <p className="title mt+ mb+ ml- mr-">{concatTitle(x.data.title)}</p>
                    <p className="author m-- ml-"><i className="fas fa-user mr-"></i> Written by {x.data.author}</p>
                    <p className="comments m-- ml-"><i className="fas fa-comment-alt mr-"></i> {x.data.num_comments} Comments</p>
                  </div>
                  <div className="d-f ai-c d-f ">
                    <p className="publish-tag"> <i className="fas fa-history mr- m-- ml-"></i> published {dateFns.distanceInWordsToNow(moment.unix(x.data.created)._d)} ago</p>
                  </div>
                  <div className="d-f m- js-fe">
                    <a href={x.data.url} className="link" target="_blank">View</a>

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

const savePostsToSessionStorage = data => {
  return window.sessionStorage.setItem(`posts`, JSON.stringify(data));
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
    let newPosts = posts.filter(x => x.data.ups > upvoteCount);
    return setPosts([...newPosts]);
  };

  if ( op === "<") {
    let newPosts = posts.filter(x => x.data.ups < upvoteCount);
    return setPosts([...newPosts]);
  };

  if ( op === "===") {
    let newPosts = posts.filter(x => x.data.ups == upvoteCount);
    return setPosts([...newPosts]);
  };
}

const fetchPosts = async (subreddit, setPosts, setLoading, count) => {
  const sr = subreddit.replace(/\s/g, '').trim();
  const link = `https://www.reddit.com/r/${sr}.json?limit=100`;
  const posts = await Axios.get(link).then(res => res.data.data.children).catch(err => err);

  setLoading("");

  if ( !sr || sr.length <= 0 ) return alert("Must include a subreddit");

  posts.shift();
  savePostsToSessionStorage(posts);
  saveSubredditToSessionStorage(subreddit);
  return setPosts([...posts]);
}

const applyFilters = () => {

}

export default PostFetch;