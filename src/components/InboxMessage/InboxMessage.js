import React from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';

const InboxMessage = ({data}) => {

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
          <HR/>
        </div>
        <InboxChat 
          data={msgArr}
        />
      </main>
    </div>
  )
}

export const destIsMe = (data) => {
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;
  return (data.dest === currentUser.replace(/\s/g, ""));
}

export default InboxMessage
