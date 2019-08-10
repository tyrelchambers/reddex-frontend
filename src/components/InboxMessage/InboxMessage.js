import React from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';
import SendChatForm from '../Forms/SendChatForm';

const InboxMessage = ({data}) => {

  if ( isEmpty(data) ) return null;
  const msgArr = [];
  
  const dataObj = {
    author: data.author,
    body: data.body,
    created: data.created
  }

  if ( !isEmpty(data.replies) ) {
    data.replies.data.children.map(x => {
      msgArr.push({
        author: x.data.author,
        body: x.data.body,
        created: x.data.created
      });
    });
  }

  msgArr.push(dataObj);

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
    
      <SendChatForm
        user={data}
        sentMsg={v => msgArr.push(v)}
      />
    </div>
  )
}

export const destIsMe = (data) => {
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;
  return (data.dest === currentUser.replace(/\s/g, ""));
}

export default InboxMessage
