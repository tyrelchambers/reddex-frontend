import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard';
import UserInbox from '../../../components/UserInbox/UserInbox';
import { inject, observer } from 'mobx-react';
import { fetchTokens } from '../../../helpers/renewRefreshToken';
import Axios from 'axios';

const Inbox = inject("InboxStore")(observer(({InboxStore}) => {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    getInbox(InboxStore, setLoading);
  }, []);
  
  console.log(InboxStore.messages.length)
  return (
    <Dashboard>
      <h1>Inbox</h1>

      <UserInbox
        loading={loading}
        InboxStore={InboxStore}
      />
    </Dashboard>
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

export default Inbox
