import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard';
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';
import CompletedStories from './CompletedStories';
import { NavLink } from 'react-router-dom';

const ReadingList = inject("ReadingListStore")(observer(({ReadingListStore, location}) => {  
  useEffect(() => {
    const token = window.localStorage.getItem('token');

    getCompletedFromDb(token, ReadingListStore)
    getCompletedStoriesFromDb(token, ReadingListStore);
  }, []);

  const params = new URLSearchParams(window.location.search);

  const Tabs = () => (
    <ul className="tabs-wrapper">
      <li className="tabs-item">
        <NavLink to="/dashboard/reading_list?t=open" activeClassName="tab-item-active" isActive={() => {
          if (params.get('t') === "open") {
            return true;
          }
        }}>Accepted</NavLink>
      </li>
      <li className="tabs-item">
        <NavLink to="/dashboard/reading_list?t=completed" activeClassName="tab-item-active" isActive={() => {
          if ( params.get('t') === "completed" ) {
            return true
          }
        }}>Completed</NavLink>
      </li>
    </ul>
  )

  return (
    <Dashboard>
      <Tabs />
      <div className="d-f mobile-column">
        {params.get('t') === "open" &&
          <ReadingListDumb 
            list={ReadingListStore.getToRead()}
            setExpanded={(v) => ReadingListStore.setDim(v)}
            callback={(v) => ReadingListStore.transferStoryFromList(v, "toRead", "completed")}
          />
        }

        {params.get('t') === "completed" &&   
          <CompletedStories 
            list={ReadingListStore.getCompleted()}
            ReadingListStore={ReadingListStore}
            callback={(v) => ReadingListStore.transferStoryFromList(v, "completed", "toRead")}
            removeStoryFromDb={removeStoryFromDb}
          />
        }
      </div>
    </Dashboard>
  )
}));



const getCompletedFromDb = (token, store) => {
  Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/reading_list?permission=true`, {
    headers: {
      token
    }
  })
  .then(res => store.addToRead(res.data))
  .catch(console.log)
}

const getCompletedStoriesFromDb = (token, ReadingListStore) => {
  Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/stories/completed`, {
    headers: {
      token
    }
  })
  .then(res => ReadingListStore.setCompleted(res.data))
  .catch(console.log);
}

const removeStoryFromDb = (token, item) => {
  Axios.delete(`${process.env.REACT_APP_BACKEND}/api/profile/stories/remove`, {
    headers: {
      token
    },
    params: {
      postId: item
    }
  })
  .then()
  .catch(console.log)
}

export default ReadingList
