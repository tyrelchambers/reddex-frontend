import React, {useEffect, useState} from 'react'
import './SubmittedStories.scss'
import Dashboard from '../Dashboard/Dashboard'
import { getAxios } from '../../api';

export default function SubmittedStories() {
  const [state, setState] = useState();

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

  return (
    <Dashboard>
      <h1>Submitted Stories</h1>
      
    </Dashboard>
  )
}
