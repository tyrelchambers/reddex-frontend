import React, {useEffect, useState} from 'react'
import './SubmittedStories.scss'
import Dashboard from '../Dashboard/Dashboard'
import { getAxios } from '../../api';
import SubmittedItem from '../../components/SubmittedItem/SubmittedItem';
import moment from 'moment';
import { toast } from 'react-toastify';
import { H1 } from '../../components/Headings/Headings'
import WithNav from '../../layouts/WithNav/WithNav'
import HR from '../../components/HR/HR';

const SubmittedStories = () => {
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
      <H1>Submitted Stories</H1>
      <WithNav>

        <p className="font-bold ">Sort by title, author, or tags</p>
        <input type="text" className="search-large w-100pr max-w-xl mt-  mb+" placeholder="Search by title, author, or tags..." onChange={e => setSortVal(e.target.value.toLowerCase())}/>  

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
      </WithNav>
    </Dashboard>
  )
};

export default SubmittedStories;