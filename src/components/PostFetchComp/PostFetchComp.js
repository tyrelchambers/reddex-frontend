import React, { useRef } from 'react'
import './PostFetchComp.scss';
import { SubSelect } from '../PostFetch/PostFetch';
import AutoComplete from '../AutoComplete/AutoComplete';
import { MainButton } from '../Buttons/Buttons';

 export default function PostFetchComp({setSubreddit, setCategoryOptions, categoryOptions, setLoading, fetchPosts, clearSelectedPosts, subreddit, setPosts, subreddits, loading}) {
   const inputRef = useRef();
   return (
    <section className="w-100pr">
      <div className="d-f post-fetch-header">
        <div className=" w-100pr ">  
          <label className="form-label light">Enter Subreddit</label>
          <div className="d-f ai-c mobile-fetch-inputs">
            <div className="w-100pr mr- pos-r">
              <input type="text" className="form-input w-100pr search-input" placeholder="Type subreddit here..." value={subreddit} onChange={(e) => setSubreddit(e.target.value)} ref={inputRef}/>
              <AutoComplete 
                subreddits={subreddits}
                subreddit={subreddit}
                setSubreddit={setSubreddit}
                inputRef={inputRef}
              />
            </div>
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
            <MainButton 
              className="btn btn-primary" 
              onClick={() => {
                setLoading(true);
                fetchPosts(subreddit, setLoading, setPosts, categoryOptions);
                clearSelectedPosts();
              }}
              disabled={subreddit.length === 0 ? true : false}
              loading={loading}
              value="Get Posts"
            >
              <i className="fas fa-sync"></i>
            </MainButton>
          </div>
        </div>
      </div>


      
    </section>
   )
 }


 

