import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard';
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';

const ReadingList = inject("ReadingListStore")(observer(({ReadingListStore}) => {

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/get_stories`, {
      headers: {
        token
      }
    })
    .then(console.log)
    .catch(console.log);
  }, []);

  return (
    <Dashboard>
      <h1>Reading List</h1>

      <ReadingListDumb 
        list={ReadingListStore.getReadingList()}
      />
    </Dashboard>
  )
}));

export default ReadingList
