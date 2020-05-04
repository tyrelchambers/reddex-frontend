import React, { useState } from 'react'
import './SubredditFilters.scss';
import filterOptionsJSON from './filterOptions';
import SelectField from '../SelectField/SelectField';
import {MinimalButton} from '../Buttons/Buttons'
import { inject, observer } from 'mobx-react';

const SubredditFilters = ({ setReloadPosts, reloadPosts,filterOptions, setFilterOptions, filter}) => {

  const [collapsed, setCollapsed] = useState(document.body.clientWidth <= 425 ? true : false);

  return(
    <div className="d-f fxd-c w-100pr filters-wrapper">
      {document.body.clientWidth <= 425 &&
        <MinimalButton
          onClick={() => setCollapsed(!collapsed)}
          classNames="mb-- mt--"
        >
          {collapsed ? "Show Filters" : "Hide Filters"}
        </MinimalButton>
      }
      {!collapsed &&
        <div className=" d-f" style={{height: '100%'}}>
          <div className="d-f w-100pr ai-c inputs">
            <SelectField 
              data={filterOptionsJSON}
              label="Greater than"
              options={filterOptions}
              setOptions={setFilterOptions}
              prop="operator"
            />
            
            <input type="number" className="form-input fx-1 ml-" placeholder="Upvote Count (default: 0)" onChange={e => setFilterOptions({...filterOptions, upvotes: e.target.value})}/>
            <input type="text" className="form-input fx-1 ml-" placeholder="keywords separated by commas" onChange={(e) => setFilterOptions({...filterOptions, keywords: e.target.value})}/>

          </div>

          <div className="filter-actions d-f ai-c">
            <button className={`btn btn-tiertiary ${filterOptions.seriesOnly ? "active" : ""}`} onClick={() => setFilterOptions({...filterOptions, seriesOnly: !filterOptions.seriesOnly})}>Series Only</button>
            <button className={`btn btn-tiertiary ${filterOptions.excludeSeries ? "active" : ""}`} onClick={() => setFilterOptions({...filterOptions, excludeSeries: !filterOptions.excludeSeries})}>Exclude Series</button>


            <button className="btn btn-tiertiary" onClick={() => {
              resetFilters(setFilterOptions);
              setReloadPosts(!reloadPosts);
            }}>Reset Filters</button>
            <button className="btn btn-secondary ml-" onClick={() => {
              filter();
            }}>Apply Filters</button>
          </div>
        </div>
      }
    </div>
  );
}


const resetFilters = (setFilterOptions) => {
  return setFilterOptions({
    seriesOnly: false,
    upvotes: 0,
    operator: ">",
    omitSeries: false,
    keywords: ""
  });
}


export default inject("PostStore")(observer(SubredditFilters));