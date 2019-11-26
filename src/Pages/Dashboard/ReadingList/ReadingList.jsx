import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard';
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';
import HR from '../../../components/HR/HR';
import CompletedStories from './CompletedStories';
import ReadingListStore from '../../../stores/ReadingListStore';

const ReadingList = inject("ReadingListStore")(observer(({ReadingListStore}) => {  
  useEffect(() => {
    const token = window.localStorage.getItem('token');

    getCompletedFromDb(token, ReadingListStore)
    getCompletedStoriesFromDb(token, ReadingListStore);
  }, []);

  return (
    <Dashboard>

      <div className="d-f mobile-column">
        <ReadingListDumb 
          list={ReadingListStore.getToRead()}
          setExpanded={(v) => ReadingListStore.setDim(v)}
          callback={(v) => ReadingListStore.transferStoryFromList(v, "toRead", "completed")}
        />

        <CompletedStories 
          list={ReadingListStore.getCompleted()}
          ReadingListStore={ReadingListStore}
          callback={(v) => ReadingListStore.transferStoryFromList(v, "completed", "toRead")}
          removeStoryFromDb={removeStoryFromDb}
        />
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
