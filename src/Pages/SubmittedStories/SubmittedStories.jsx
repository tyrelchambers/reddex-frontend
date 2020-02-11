import React, {useEffect, useState} from 'react'
import './SubmittedStories.scss'
import Dashboard from '../Dashboard/Dashboard'
import { getAxios } from '../../api';
import SubmittedItem from '../../components/SubmittedItem/SubmittedItem';
import { inject, observer } from 'mobx-react';
import moment from 'moment';

const SubmittedStories = inject("ModalStore")(observer(({ModalStore}) => {
  const [state, setState] = useState([]);
  const [ sortVal, setSortVal ] = useState("");

  useEffect(() => {
    const fn = async () => {
      await getAxios({
        url: '/submitted/'
      }).then(res => {
        if (res) {
          setState([...res])
        }
      })
    }

    fn()
  }, []);

  const stories = 
    state
      .filter(x => {
        if (
          x.story_title.toLowerCase().includes(sortVal.toLowerCase())
          || x.author.toLowerCase().includes(sortVal.toLowerCase())
          || x.tags.toLowerCase().includes(sortVal.toLowerCase())
          ) {
            return x;
          }
      })
      .sort((a, b) => moment(a.created_at).valueOf() - moment(b.created_at).valueOf())
      .reverse()
      .map((x, id) => <SubmittedItem data={x} key={id} />)

  return (
    <Dashboard>
      <h1>Submitted Stories</h1>

      <p className="font-bold mt+">Sort by title, author, or tags</p>
      <input type="text" className="search-large w-100pr  mb+" placeholder="Search inbox by username..." onChange={e => setSortVal(e.target.value.toLowerCase())}/>  
      <div className="d-f submitted-headers">
        <p>Title</p>
        <p>Author</p>
        <p>Tags</p>
        <p>Submitted</p>
        <p>Actions</p>
      </div>
      <div className="submitted-stories">
        {stories}
      </div>
    </Dashboard>
  )
}));

export default SubmittedStories;