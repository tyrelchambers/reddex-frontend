import React, { useEffect, useState } from 'react'
import './ReadingList.scss';
import ReadingListDumb from './ReadingListDumb';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';
import CompletedStories from './CompletedStories';
import { Redirect } from 'react-router-dom';
import { MinimalButton } from '../../../components/Buttons/Buttons';
import { Modal } from '../../../components/Modal/Modal';
import { ImportStoryForm } from '../../../components/Forms/ImportStoryForm';
import { saveStoryToReadingList } from '../../../api/post';
import { getImportedStory } from '../../../api/get';
import { toast } from 'react-toastify';
import { is_url } from '../../../helpers/isURL';
import tabs from './tabs';
import Tabs from '../../../layouts/Tabs/Tabs';

const ReadingList = inject("ReadingListStore", "ModalStore", "UserStore")(observer(({ReadingListStore, ModalStore}) => {  
  const [ url, setURL ] = useState();
  const [ refresh, setRefresh ] = useState(false);
  const [ saving, setSaving ] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem('token');

    getCompletedFromDb(token, ReadingListStore)
    getCompletedStoriesFromDb(token, ReadingListStore);

    return () => {
      setRefresh(false)
    }
  }, [refresh]);

  const params = new URLSearchParams(window.location.search);

  if ( !params.get('t') ) {
    return <Redirect to="/dashboard/reading_list?t=open" />
  }

  const saveStoryFromURL = async (e) => {
    e.preventDefault();
    setSaving(true)
    const formattedURL = `${url.match(/[\s\S]+\//ig)}.json`;

    if ( !is_url(formattedURL) ) {
      toast.error("Improper URL format, try again")
      return false;
    }

    const story = await getImportedStory(formattedURL);

    const data = {
      author: story.author,
      title: story.title,
      self_text: story.selftext,
      ups: story.ups,
      url: story.url,
      num_comments: story.num_comments,
      created: story.created_utc,
      link_flair_text: story.link_flair_text,
      post_id: story.id,
      subreddit: story.subreddit,
      permission: true
    }
    
    await saveStoryToReadingList(data);
    ModalStore.setIsOpen(false);
    setRefresh(true);
    setSaving(false);
    toast.success("Story added to list")
  }

  return (
    <>
      <div className="d-f ai-c mobile-column">
        <Tabs url="/dashboard/reading_list" data={tabs}/>

        
        <MinimalButton
          onClick={() => ModalStore.setIsOpen(true)}
          classNames="mobile-margin"
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
            loading={saving}
          />
          </div>
        </Modal>
      }
    </>
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
      post_id: item
    }
  })
  .then()
  .catch(console.log)
}

export default ReadingList
