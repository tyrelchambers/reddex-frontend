import React, { useState, useEffect } from 'react'
import moment from 'moment';
import dateFns from 'date-fns';
import './InboxChat.scss';
import SendChatForm from '../Forms/SendChatForm';

const InboxChat = ({data}) => {
  const [ chatLogs, setChatLogs] = useState([])
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;

  useEffect(() => {
    setChatLogs([...data]);
  }, [data]);

  const chats = chatLogs.sort((a, b) => {
    return a.created - b.created;
  }).map((x, id) => {
    const isCurrent = x.author === currentUser.replace(/\s/g, "") ? true : false;

    return(
      <li key={id} className="chat">
        <h4 className={`chat-author ${isCurrent ? "chat-right" : ""}`}>{isCurrent ? "You" : x.author}</h4>
        <p className={`chat-body ${isCurrent ? "chat-body-light" : "chat-body-dark"}`}>
          {x.body}
        </p>
        <p className={`chat-date ${isCurrent ? "chat-right" : ""}`}>{dateFns.format(moment.unix(x.created)._d, "MMM DD, YYYY h:mm:ss aa")}</p>
      </li>
    )
  })

  return (
    <div className="chat-bubble">
      <ul>
        {chats}
      </ul>
      <SendChatForm
        user={data}
        sentMsg={v => setChatLogs([...chatLogs, v])}
      />
    </div>
  )
}

export default InboxChat
