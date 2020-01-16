import React, { useRef } from 'react'
import './PostFetchComp.scss';
import AutoComplete from '../AutoComplete/AutoComplete';
import { MainButton } from '../Buttons/Buttons';
import SelectField from '../SelectField/SelectField';
import optionsJSON from './categoryOptions';
import timeframeJSON from './timeframeOptions';

 export default function PostFetchComp({setSubreddit, setCategoryOptions, categoryOptions, setLoading, fetchPosts, clearSelectedPosts, subreddit, setPosts, subreddits, loading}) {
   const inputRef = useRef();

   return (
    <section className="w-100pr d-f post-fetch-header">
      <div className=" w-100pr post-fetch-search">  
        <label className="form-label dark">Enter Subreddit</label>
        <div className="d-f ai-c h-48px mobile-fetch-inputs">
          <div className="w-100pr mr- pos-r search-autocomplete-wrapper">
            <input type="text" className="form-input w-100pr search-input" placeholder="Type subreddit here..." value={subreddit} onChange={(e) => setSubreddit(e.target.value)} ref={inputRef}/>
            <AutoComplete 
              subreddits={subreddits}
              subreddit={subreddit}
              setSubreddit={setSubreddit}
              inputRef={inputRef}
            />
          </div>
          <SelectField
            data={optionsJSON}
            label="Hot"
            options={categoryOptions}
            setOptions={setCategoryOptions}
            prop="category"
          />

          {(categoryOptions.category === "top" || categoryOptions.category === "controversial") &&
            <SelectField
              data={timeframeJSON}
              label="Past 24 Hours"
              options={categoryOptions}
              setOptions={setCategoryOptions}
              prop="timeframe"
            />
          }
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
    </section>
   )
 }

 

 

