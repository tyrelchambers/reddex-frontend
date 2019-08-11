import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import UserInboxDumb from './UserInboxDumb';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import { inject, observer } from 'mobx-react';
import InboxMessage from '../InboxMessage/InboxMessage';

const UserInbox = inject("InboxStore")(observer(({InboxStore}) => {
  const [ loading, setLoading ] = useState(false);
  const [ showChat, setShowChat ] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInbox(InboxStore, setLoading);
  }, []);

  const selectHandler = (msg) => {
    return InboxStore.setSelectedMessage(msg);
  }

  const showChatComp = showChat ? <InboxMessage data={InboxStore.getSelectedMessage()}/> : null;

  return(

      <div className="inbox-wrapper d-f">
        <UserInboxDumb 
          data={InboxStore.getMessages()}
          onClick={(v) => {
            selectHandler(v);
            setShowChat(true);
          }}
          
          selected={InboxStore.getSelectedMessage()}
        />

        {showChatComp}
      </div>
  )
  
}));

const getInbox = async (InboxStore, setLoading) => {
  const token = await fetchTokens();
  Axios.get(`https://oauth.reddit.com/message/messages`, {
    headers: {
      "Authorization": `bearer ${token.access_token}`
    }
  })
  .then(res => {
    InboxStore.setMessages({
      data: res.data.data.children,
      after: res.data.data.after
    });
    setLoading(false);
  })
  .catch(console.log);
}

export default UserInbox
