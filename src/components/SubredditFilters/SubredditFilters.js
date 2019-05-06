import React from 'react'
import './SubredditFilters.scss';

const SubredditFilters = ({operator, setPendingFilters, setKeywords, resetFilters, setReloadPosts, filterOptions, pendingFilters, posts, setPosts, setFilterOptions, formatPosts, reloadPosts}) => {
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
        
        <input type="number" className="input ml-" placeholder="Upvote Count (default: 0)" onChange={e => setPendingFilters({upvotes: e.target.value})}/>
        {/* <input type="text" className="input ml-" placeholder="keywords separated by commas" onChange={(e) => setKeywords(e.target.value)}/> */}

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
  );
}

export default SubredditFilters;