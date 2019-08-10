import React, { useState, useEffect } from 'react'
import moment from 'moment';
import dateFns from 'date-fns';
import './InboxChat.scss';
import '../Buttons/buttons.scss';
import SendChatForm from '../Forms/SendChatForm';

const InboxChat = ({data}) => {
  const [ chatLogs, setChatLogs] = useState([])
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;

  useEffect(() => {
    setChatLogs([...data]);
  }, [data]);

  const chats = chatLogs.sort((a, b) => {
    return a.created_utc - b.created_utc;
  }).map((x, id) => {
    const isCurrent = x.author === currentUser.replace(/\s/g, "") ? true : false;

    return(
      <li key={id} className="chat">
        <h4 className={`chat-author ${isCurrent ? "chat-right" : ""}`}>{isCurrent ? "You" : x.author}</h4>
        <div className={`chat-body-wrapper  ${isCurrent ? "right" : ""}`}>
          <p className={`chat-body ${isCurrent ? "chat-body-light" : "chat-body-dark"}`}>
            {x.body}
          </p>

          
        </div>
        <div className={`d-f ai-c chat-footer ${isCurrent ? "right" : ""}`}>
          <p className={`chat-date ${isCurrent ? "chat-right" : ""}`}>{dateFns.format(moment.unix(x.created_utc)._d, "MMM DD, YYYY h:mm:ss aa")}</p>
          <div className="chat-actions d-f">
            <div className="chat-action-toggle" >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="chat-action-btn-wrapper d-f">
              <button className="chat-action primary ai-c">
                <i className="fas fa-bookmark mr-"></i>
                Add to Read List
              </button>
              <button className="chat-action danger">
                <i className="fas fa-trash mr-"></i>
                Delete
              </button>
            </div>
          </div>
        </div>
      </li>
    )
  })

  return (
    <div className="chat-bubble animated fadeIn faster">
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
