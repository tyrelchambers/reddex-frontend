import React, {useEffect, useState} from 'react'
import './SubmittedStories.scss'
import Dashboard from '../Dashboard/Dashboard'
import { getAxios } from '../../api';
import SubmittedItem from '../../components/SubmittedItem/SubmittedItem';
import { inject, observer } from 'mobx-react';
import { Modal } from '../../components/Modal/Modal';
import moment from 'moment';

const SubmittedStories = inject("ModalStore")(observer(({ModalStore}) => {
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

  const stories = state.sort((a, b) => moment(a.created_at).valueOf() - moment(b.created_at).valueOf()).reverse().map((x, id) => <SubmittedItem data={x} key={id} />)

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
}));

export default SubmittedStories;