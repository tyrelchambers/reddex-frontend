import React, { useState } from 'react'
import './SubredditFilters.scss';
import filterOptionsJSON from './filterOptions';
import SelectField from '../SelectField/SelectField';
import { toast } from 'react-toastify';
import {MinimalButton} from '../Buttons/Buttons'
import { inject, observer } from 'mobx-react';
import { getAxios } from '../../api';

const SubredditFilters = ({ setReloadPosts, reloadPosts,filterOptions, setFilterOptions, getPostsFromDatabase, PostStore }) => {
  const [ keywords, setKeywords ] = useState("");

  const [collapsed, setCollapsed] = useState(document.body.clientWidth <= 425 ? true : false);

  const filter = async () => {
    await getPostsFromDatabase().then(res => {
      PostStore.setPosts([ ...res])
    })
  }

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
            <input type="text" className="form-input fx-1 ml-" placeholder="keywords separated by commas" onChange={(e) => setKeywords(e.target.value)}/>

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
              //applyFilters(posts, setPosts, keywords, filterOptions.upvotes, filterOptions.operator, filterOptions.seriesOnly);
            }}>Apply Filters</button>
          </div>
        </div>
      }
    </div>
  );
}


const resetFilters = (setFilterOptions) => {
  return setFilterOptions({
    upvotes: 0,
    seriesOnly: false,
    operator: ">"
  });
}

// const seriesOnlyFilter = (data) => {
//   const newPromise = new Promise((resolve, reject) => {
//     const posts = data.filter(x => x.link_flair_text === "Series");
//     resolve(posts);
//   });

//   return newPromise;
// }


// const keywordSearch = (data, posts) => {
//   if ( !data || data.length === 0 ) return false;
  
//   const newPromise = new Promise((resolve, reject) => {
//     const keywords = data.split(", ");
//     let results;
//     for ( let i = 0; i < keywords.length; i++ ) {
//       let postsTitle = posts.filter(x => x.title.toLowerCase().includes(keywords[i].toLowerCase()));
//       let postsBody = posts.filter(x => x.self_text.toLowerCase().includes(keywords[i].toLowerCase()));
//       let set = new Set([...postsTitle, ...postsBody]);
//       results = [...set];
//     }
//     resolve(results);
//   });

//   return newPromise;
// }

// const operatorSort = (upvoteCount, posts, operator) => {
//   const newPromise = new Promise((resolve, reject) => {
//     const op = operator;
//     if ( op === ">") {
//       let newPosts = posts.filter(x => x.ups > upvoteCount);
//       resolve(newPosts);
//     };

//     if ( op === "<") {
//       let newPosts = posts.filter(x => x.ups < upvoteCount);
//       resolve(newPosts);
//     };

//     if ( op === "===") {
//       let newPosts = posts.filter(x => x.ups == upvoteCount);
//       resolve(newPosts);
//     };
//     reject("No operator specified");

//   }); 

//   return newPromise;
// }

// const applyFilters = async (posts, setPosts, keywords = "", upvoteCount = 0, operator, seriesOnly) => {
//   let newPosts = [...posts];

//   if ( keywords.length ) {
//     await keywordSearch(keywords, posts).then(res => {
//       if ( res.length === 0 ) {
//         newPosts = [...res]
//         return toast.error(`No results found for ${keywords}`)
//       }

//       newPosts = [...res]
//     }).catch(console.log);
//   }

//   if ( seriesOnly ) {
//     await seriesOnlyFilter(newPosts, seriesOnly).then(res =>  {
//       if ( res.length === 0 ) {
//         newPosts = [...res]
//         return toast.error(`No results found`)
//       }

//       newPosts = [...res]
//     }).catch(console.log);
//   }

//   if ( upvoteCount > 0 ) {
//     await operatorSort(upvoteCount, newPosts, operator).then(res =>  {
//       if ( res.length === 0 ) {
//         newPosts = [...res]
//         return toast.error(`No results found`)
//       }

//       newPosts = [...res]
//     }).catch(console.log);
//   }
  
//   return setPosts(newPosts);
// }

export default inject("PostStore")(observer(SubredditFilters));