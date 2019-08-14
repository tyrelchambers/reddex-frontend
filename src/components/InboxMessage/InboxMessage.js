import React, { useState, useEffect } from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';
import Axios from 'axios';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const InboxMessage = inject("InboxStore")(observer(({InboxStore}) => {
  const [ storyLink, setStoryLink ] = useState("");
  const [ data, setData ] = useState();

  useEffect(() => {
    getStory(InboxStore.getSelectedMessage(), setStoryLink);
    setData(InboxStore.getSelectedMessage());
  }, [InboxStore.selectedMessage]);

  if ( isEmpty(data) ) return null;

  const msgArr = [];

  if ( !isEmpty(data.replies) ) {
    data.replies.data.children.map(x => {
      msgArr.push(x.data);
    });
  }

  msgArr.push(data);

  const MessageTags = () => {
    if (!storyLink) return null;
    return(
      <div className="d-f ai-c mb- ">
         <a href={storyLink} target="_blank" className="message-story-tag">Link to story</a>
         <button className="chat-action primary ai-c" onClick={() => permissionHandler(true, data)}>
          <i className="fas fa-bookmark mr-"></i>
          Add to reading List
        </button>
      </div>
    )
  }
  
  return (
    <div className="inbox-message-wrapper fx-1 ml+">
      <main>
        <div className="d-f fxd-c">
          <h2>{data.subject}</h2>
          <p className="mb- message-subtitle">From: {destIsMe(data) ? data.author : data.dest}</p>
          <div className="message-tags">
            <MessageTags />
           
          </div>
          <HR/>
        </div>
        <InboxChat 
          data={msgArr}
        />
      </main>
    </div>
  )
}));

const permissionHandler = (bool, data) => {
  const token = window.localStorage.getItem('token');
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/set_permission`, {
    author: data.dest,
    title: data.subject,
    permission: bool
  }, {
    headers: {
      token
    }
  })
  .then()
  .catch(console.log)
}

const getStory = (data, setStoryLink) => {
  const token = window.localStorage.getItem('token');
  Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/get_story?title=${data.subject}&author=${data.dest}`, {
    headers: {
      token
    }
  })
  .then(res => setStoryLink(res.data.url))
  .catch(console.log);
}

export const destIsMe = (data) => {
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;
  return (data.dest === currentUser.replace(/\s/g, ""));
}

export default InboxMessage
