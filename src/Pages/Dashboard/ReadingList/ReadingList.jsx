import React, { useEffect, useState } from 'react'
import Dashboard from '../Dashboard';
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';
import CompletedStories from './CompletedStories';
import { NavLink, Redirect } from 'react-router-dom';
import { MinimalButton } from '../../../components/Buttons/Buttons';
import { Modal } from '../../../components/Modal/Modal';
import { ImportStoryForm } from '../../../components/Forms/ImportStoryForm';
import { saveStoryToReadingList } from '../../../api/post';

const ReadingList = inject("ReadingListStore", "ModalStore", "UserStore")(observer(({ReadingListStore, ModalStore}) => {  
  const [ url, setURL ] = useState();

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    getCompletedFromDb(token, ReadingListStore)
    getCompletedStoriesFromDb(token, ReadingListStore);
  }, []);

  const params = new URLSearchParams(window.location.search);

  if ( !params.get('t') ) {
    return <Redirect to="/dashboard/reading_list?t=open" />
  }

  const Tabs = () => (
    <ul className="tabs-wrapper">
      <li className="tabs-item">
        <NavLink to="/dashboard/reading_list?t=open" activeClassName="tab-item-active" isActive={() => {
          if (params.get('t') === "open") {
            return true;
          }
        }}>Accepted</NavLink>
      </li>
      <li className="tabs-item">
        <NavLink to="/dashboard/reading_list?t=completed" activeClassName="tab-item-active" isActive={() => {
          if ( params.get('t') === "completed" ) {
            return true
          }
        }}>Completed</NavLink>
      </li>
    </ul>
  )

  const saveStoryFromURL = (e) => {
    e.preventDefault();
    
    const formattedURL = `${url}.json`;
    const data = {
      author: formattedURL.author,
      title: formattedURL.title,
      selftext: formattedURL.selftext,
      ups: formattedURL.ups,
      url: formattedURL.url,
      num_comments: formattedURL.num_comments,
      created: formattedURL.created_utc,
      link_flair_text: formattedURL.link_flair_text,
      postId: formattedURL.postId,
      subreddit: formattedURL.subreddit
    }
    console.log(formattedURL)
    // saveStoryToReadingList()
    
  }

  return (
    <Dashboard>
      <div className="d-f ai-c">
        <Tabs />
        
        <MinimalButton
          onClick={() => ModalStore.setIsOpen(true)}
        >
          <i className="fas fa-plus mr-"></i>
          Import Story from URL
        </MinimalButton>
      </div>
      <div className="d-f mobile-column">
        {params.get('t') === "open" &&
          <ReadingListDumb 
            list={ReadingListStore.getToRead()}
            callback={(v) => ReadingListStore.transferStoryFromList(v, "toRead", "completed")}
          />
        }

        {params.get('t') === "completed" &&   
          <CompletedStories 
            list={ReadingListStore.getCompleted()}
            ReadingListStore={ReadingListStore}
            callback={(v) => ReadingListStore.transferStoryFromList(v, "completed", "toRead")}
            removeStoryFromDb={removeStoryFromDb}
          />
        }
      </div>

      {ModalStore.isOpen &&
        <Modal>
          <h2 className="ta-c">Import A Story </h2>
          <div className="d-f jc-c">
          <ImportStoryForm
            url={url}
            setURL={(e) => setURL(e.target.value)}
            submitHandler={saveStoryFromURL}
          />
          </div>
        </Modal>
      }
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
