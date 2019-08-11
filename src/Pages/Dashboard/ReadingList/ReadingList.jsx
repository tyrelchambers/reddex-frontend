import React from 'react'
import Dashboard from '../Dashboard';
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import ReadingListStore from '../../../stores/ReadingListStore';

const ReadingList = inject("ReadingListStore")(observer(({ReadingListStore}) => {
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
