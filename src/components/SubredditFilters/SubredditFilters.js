import React, { useState } from 'react'
import './SubredditFilters.scss';
import filterOptionsJSON from './filterOptions';
import SelectField from '../SelectField/SelectField';
import {MinimalButton} from '../Buttons/Buttons'
import { inject, observer } from 'mobx-react';

const SubredditFilters = ({refetch, filterOptions, setFilterOptions, filter, setRefetch}) => {

  const [collapsed, setCollapsed] = useState(document.body.clientWidth <= 425 ? true : false);

  return(
    <div className="d-f fxd-c w-100pr filters-wrapper">
      {document.body.clientWidth <= 425 &&
        <MinimalButton
          onClick={() => setCollapsed(!collapsed)}
          classNames="mb-- mt-- bg"
        >
          {collapsed ? "Show Filters" : "Hide Filters"}
        </MinimalButton>
      }
      {!collapsed &&
        <div className="d-f fxd-c filters">
          <div className=" d-f" style={{height: '100%'}}>
            <div className="d-f w-100pr ai-c inputs">
              <div className="d-f fxd-c">
                <h5 className="mb--">Sort by upvotes</h5>
                <div className="d-f fx-1">
                  <SelectField 
                    data={filterOptionsJSON}
                    defaultLabel="Select operator"
                    options={filterOptions}
                    setOptions={setFilterOptions}
                    prop="operator"
                  />
                  
                  <input type="number" className="form-input" placeholder="Upvote Count (default: 0)" value={filterOptions.upvotes} onChange={e => setFilterOptions({...filterOptions, upvotes: e.target.value})}/>
                </div>
              </div>
              <div className="d-f fxd-c  ml- fx-1">
                <h5 className="mb--">Sort by exact phrase (ex: dark web)</h5>
                <input type="text" className="form-input fx-1" placeholder="search phrase" value={filterOptions.keywords} onChange={(e) => setFilterOptions({...filterOptions, keywords: e.target.value})}/>

              </div>
            </div>
          </div>
          <div className=" d-f ai-c mt-">
            <div className="d-f fxd-c filter-actions">
              <h5 className="mb--">Filter actions</h5>
              <div className="d-f fxw-w">
                <button className={`btn btn-tiertiary ${filterOptions.seriesOnly ? "active" : ""}`} onClick={() => setFilterOptions({...filterOptions, seriesOnly: !filterOptions.seriesOnly})}>Series Only</button>
                <button className={`btn btn-tiertiary ${filterOptions.excludeSeries ? "active" : ""}`} onClick={() => setFilterOptions({...filterOptions, excludeSeries: !filterOptions.excludeSeries})}>Exclude Series</button>


                <button className="btn btn-tiertiary" onClick={() => {
                  setFilterOptions({
                    seriesOnly: false,
                    upvotes: 0,
                    operator: "",
                    omitSeries: false,
                    keywords: ""
                  });
                  setRefetch(true)
                }}>Reset Filters</button>
                <button className="btn btn-secondary ml-" onClick={() => {
                  filter();
                }}>Apply Filters</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default inject("PostStore")(observer(SubredditFilters));