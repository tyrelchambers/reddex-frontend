import React, {useEffect, useState} from 'react'
import './SubmittedStories.scss'
import Dashboard from '../Dashboard/Dashboard'
import { getAxios } from '../../api';
import SubmittedItem from '../../components/SubmittedItem/SubmittedItem';
import { inject, observer } from 'mobx-react';
import moment from 'moment';
import { toast } from 'react-toastify';

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

  const deleteHandler = (uuid) => {
    const copy = state;
    getAxios({
      url: '/submitted/delete',
      method: 'delete',
      params: {
        uuid
      }
    }).then(res => {
      if (res) {
        toast.success(res)
        state.filter((x, id) => {
          if (x.uuid === uuid) {
            copy.splice(id, 1);
            return setState([...copy])
          }
        })
      }
    })
  }
  const stories = 
    state
      .filter(x => {
        console.log(x)
        if (
          (x.story_title && x.story_title.toLowerCase().includes(sortVal.toLowerCase()))
          || (x.author && x.author.toLowerCase().includes(sortVal.toLowerCase()))
          || (x.tags && x.tags.toLowerCase().includes(sortVal.toLowerCase()))
          ) {
            return x;
          }
      })
      .sort((a, b) => moment(a.created_at).valueOf() - moment(b.created_at).valueOf())
      .reverse()
      .map((x, id) => <SubmittedItem data={x} key={id} deleteHandler={deleteHandler}/>)

  return (
    <Dashboard>
      <h1>Submitted Stories</h1>

      <p className="font-bold mt+">Sort by title, author, or tags</p>
      <input type="text" className="search-large w-100pr  mb+" placeholder="Search inbox by username..." onChange={e => setSortVal(e.target.value.toLowerCase())}/>  
      
      <div className="grid-wrapper">
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
      </div>
    </Dashboard>
  )
}));

export default SubmittedStories;