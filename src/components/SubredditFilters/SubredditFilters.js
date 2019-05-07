import React, { useState } from 'react'
import './SubredditFilters.scss';

const SubredditFilters = ({ setReloadPosts, posts, setPosts, reloadPosts}) => {
  const [ keywords, setKeywords ] = useState("");
  const [ filterOptions, setFilterOptions ] = useState({
    seriesOnly: false,
    upvotes: 0
  });
  
  let operator = ">";

  return(
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
        
        <input type="number" className="input ml-" placeholder="Upvote Count (default: 0)" onChange={e => setFilterOptions({upvotes: e.target.value})}/>
        <input type="text" className="input ml-" placeholder="keywords separated by commas" onChange={(e) => setKeywords(e.target.value)}/>

      </div>

      <button className="btn btn-tiertiary" onClick={() => setFilterOptions({seriesOnly: true})}>Series Only</button>

      <button className="btn btn-tiertiary" onClick={() => {
        resetFilters(setFilterOptions);
        setReloadPosts(!reloadPosts);
      }}>Reset Filters</button>
      <button className="btn btn-secondary ml-" onClick={() => {
        applyFilters(posts, setPosts, keywords, filterOptions.upvotes, operator);
      }}>Apply Filters</button>
    </div>
  );
}


const resetFilters = (setFilterOptions) => {
  return setFilterOptions({
    upvotes: 0,
    seriesOnly: false
  });
}

const keywordSearch = (data, posts) => {
  if ( !data || data.length === 0 ) return false;
  
  const newPromise = new Promise((resolve, reject) => {
    const keywords = data.split(", ");
    let results;
    for ( let i = 0; i < keywords.length; i++ ) {
      let postsTitle = posts.filter(x => x.title.toLowerCase().includes(keywords[i].toLowerCase()));
      let postsBody = posts.filter(x => x.selftext.toLowerCase().includes(keywords[i].toLowerCase()));
      let set = new Set([...postsTitle, ...postsBody]);
      results = [...set];
    }
    resolve(results);
  });

  return newPromise;
}

const operatorSort = (upvoteCount, posts, operator) => {
  const newPromise = new Promise((resolve, reject) => {
    const op = operator;
    
    if ( op === ">") {
      let newPosts = posts.filter(x => x.ups > upvoteCount);
      resolve(newPosts);
    };

    if ( op === "<") {
      let newPosts = posts.filter(x => x.ups < upvoteCount);
      resolve(newPosts);
    };

    if ( op === "===") {
      let newPosts = posts.filter(x => x.ups == upvoteCount);
      resolve(newPosts);
    };
    reject("No operator specified");

  }); 

  return newPromise;
}

const applyFilters = async (posts, setPosts, keywords = "", upvoteCount = 0, operator = ">") => {
  let newPosts = [...posts];

  if ( keywords ) {
    await keywordSearch(keywords, posts).then(res => newPosts = [...res]).catch(console.log);
  }

  if ( upvoteCount > 0 ) {
    await operatorSort(upvoteCount, newPosts, operator).then(res => newPosts = [...res]);
  }

  return setPosts([...newPosts]);
}

export default SubredditFilters;