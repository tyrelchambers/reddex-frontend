import React, { useState } from 'react';
import './PostFetch.scss';
import Axios from 'axios';
import Loading from '../Loading/Loading';

const PostFetch = (props) => {
  const [subreddit, setSubreddit] = useState("");
  const [ posts, setPosts ] = useState([...JSON.parse(window.sessionStorage.getItem('posts'))]);
  const [loading, setLoading] = useState("");
  const [ count, setCount ] = useState(100);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [operator, setOperator] = useState(">");

  return (
    <section className="w-100pr">
      <div className="d-f header">
        <div className="d-f ai-c w-100pr">
          <input type="text" className="input mr-" placeholder="subreddit" onChange={(e) => setSubreddit(e.target.value)}/>
          <input type="number" className="input mr-" placeholder="# of posts to return (default 100)" onChange={(e) => setCount(e.target.value)}/>
        </div>
        <button className="btn btn-primary" onClick={() => {
          setLoading("Fetching posts...");
          fetchPosts(subreddit, setPosts, setLoading, count);
        }}><i className="fas fa-sync"></i> Get Posts</button>
      </div>
      
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
        </div>
        <button className="btn btn-tiertiary" onClick={() => {
          setPosts([...JSON.parse(window.sessionStorage.getItem('posts'))]);
        }}>Reset Filters</button>
        <button className="btn btn-secondary ml-" onClick={() => formatPosts(upvoteCount, posts, operator, setPosts)}>Apply Filters</button>
      </div>
      
      <div>
        <ul className="grid">
          <li className="grid-item">Upvotes</li>
          <li className="grid-item">Title</li>
          <li className="grid-item"># of Comments</li>
          <li className="grid-item">Author</li>
        </ul>
        
        {loading &&
          <Loading />
        }

        {(posts.length > 0 && !loading) && 
          <ul>
            {posts.map((x, id) => {
              return(
                <li key={id} className="d-f ai-c posts-grid post">
                  <h1 className="mr+ upvotes">{x.data.ups}</h1>
                  <p className="title">{x.data.title}</p>
                  <p className="comments">{x.data.num_comments}</p>
                  <p className="author">{x.data.author}</p>
                  <a href={x.data.url} className="link" target="_blank">View</a>
                </li>
              )
            })}
          </ul>
        }
      </div>
    </section>
  );
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
  const link = `https://www.reddit.com/r/${sr}.json?limit=${count}`;
  const posts = await Axios.get(link).then(res => res.data.data.children).catch(err => err);
  setLoading("");

  if ( !sr || sr.length <= 0 ) return alert("Must include a subreddit");

  posts.shift();
  window.sessionStorage.setItem('posts', JSON.stringify(posts));
  return setPosts([...posts]);
}

export default PostFetch;