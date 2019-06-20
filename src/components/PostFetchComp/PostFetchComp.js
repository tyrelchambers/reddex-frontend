import React from 'react'
import './PostFetchComp.scss';
import { SubSelect } from '../PostFetch/PostFetch';
 
 export default function PostFetchComp({setSubreddit, setCategoryOptions, categoryOptions, setLoading, fetchPosts, setSelectedPosts, subreddit, setPosts}) {
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


      
    </section>
   )
 }
 