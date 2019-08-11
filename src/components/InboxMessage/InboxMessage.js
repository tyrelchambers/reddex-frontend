import React, { useState, useEffect } from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';
import Axios from 'axios';

const InboxMessage = ({data}) => {
  const [ storyLink, setStoryLink ] = useState("");

  useEffect(() => {
    getStory(data, setStoryLink);
  }, []);

  if ( isEmpty(data) ) return null;

  const msgArr = [];

  if ( !isEmpty(data.replies) ) {
    data.replies.data.children.map(x => {
      msgArr.push(x.data);
    });
  }

  msgArr.push(data);

  return (
    <div className="inbox-message-wrapper fx-1 ml+">
      <main>
        <div className="d-f fxd-c">
          <h2>{data.subject}</h2>
          <p className="mb-">From: {destIsMe(data) ? data.author : data.dest}</p>
          <div className="message-tags">
            <a href={storyLink} target="_blank" className="mb- message-story-tag">Link to story</a>
          </div>
          <HR/>
        </div>
        <InboxChat 
          data={msgArr}
        />
      </main>
    </div>
  )
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
