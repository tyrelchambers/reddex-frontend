import React, {useEffect, useState} from 'react'
import './SubmittedStories.scss'
import Dashboard from '../Dashboard/Dashboard'
import { getAxios } from '../../api';
import SubmittedItem from '../../components/SubmittedItem/SubmittedItem';

export default function SubmittedStories() {
  const [state, setState] = useState([]);

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

  const stories = state.map((x, id) => <SubmittedItem data={x} key={id} />)

  return (
    <Dashboard>
      <h1>Submitted Stories</h1>

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
}
