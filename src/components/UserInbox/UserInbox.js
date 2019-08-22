import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import UserInboxDumb from './UserInboxDumb';
import { inject, observer } from 'mobx-react';
import InboxMessage from '../InboxMessage/InboxMessage';
import Loading from '../Loading/Loading';

const UserInbox = ({InboxStore, loading}) => {
  const [ showChat, setShowChat ] = useState(false);
  const [ messages, setMessages ] = useState();
  const [ sortVal, setSortVal ] = useState("");

  useEffect(() => {
    const _ = async () => {
      const msgs = await InboxStore.getMessages();
       setMessages(msgs);
    };
    _()
  }, [InboxStore.messages])

  useEffect(() => {
    if ( sortVal ) {
      const sort = sortInbox(InboxStore.getMessages(), sortVal);
      setMessages(sort);
    } else {
      setMessages(InboxStore.getMessages())
    }
  }, [sortVal]);

  const selectHandler = (msg) => {
    return InboxStore.setSelectedMessage(msg);
  }

  const showChatComp = showChat ? <InboxMessage data={InboxStore.getSelectedMessage()}/> : null;

  if ( loading ) return <Loading title="Fetching inbox from Reddit"/>

  return(
    <div className="inbox-wrapper d-f">
      <UserInboxDumb 
        data={messages}
        onClick={(v) => {
          selectHandler(v);
          setShowChat(true);
        }}
        setSortVal={e => setSortVal(e.target.value)}
        selected={InboxStore.getSelectedMessage()}
      />

      {showChatComp}
    </div>
  )
};

const sortInbox = (data,  sortVal) => {
  const currentUser = JSON.parse(window.localStorage.getItem('reddit_profile')).subreddit.title;

  return data.filter(x => {
    const isCurrent = x.data.author === currentUser.replace(/\s/g, "") ? true : false;
    const dest = x.data.dest.toLowerCase();
    const author = x.data.author.toLowerCase();

    return isCurrent ? dest.includes(sortVal) : author.includes(sortVal);
  })
}

export default UserInbox
