import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard';
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';
import HR from '../../../components/HR/HR';

const ReadingList = inject("ReadingListStore")(observer(({ReadingListStore}) => {  
  useEffect(() => {
    const token = window.localStorage.getItem('token');

    Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/get_stories`, {
      headers: {
        token
      }
    })
    .then(res => ReadingListStore.setReadingList(res.data))
    .catch(console.log);
  }, []);

  return (
    <Dashboard>
      <h1 className="mb-">Reading List</h1>
      <HR />
      <ReadingListDumb 
        list={ReadingListStore.getReadingList()}
        expanded={ReadingListStore.dim}
        setExpanded={(v) => ReadingListStore.setDim(v)}
      />
    </Dashboard>
  )
}));

export default ReadingList
