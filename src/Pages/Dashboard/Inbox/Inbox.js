import React, { useState, useEffect } from 'react'
import Dashboard from '../Dashboard';
import UserInbox from '../../../components/UserInbox/UserInbox';
import { inject, observer } from 'mobx-react';
import { fetchTokens } from '../../../helpers/renewRefreshToken';
import Axios from 'axios';
import './Inbox.scss'
import { checkValidTokens } from '../../../helpers/checkValidTokens';

const Inbox = inject("InboxStore")(observer(({InboxStore}) => {
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    if ( InboxStore.messages.length === 0 ) {
      getInbox(InboxStore, setLoading);
    } else {
      setLoading(false)
    }
  }, []);
  
  return (
    <Dashboard>
    
      {InboxStore.openChatWindow &&
        <Breadcrumbs
          store={InboxStore}
        />
      }
      <UserInbox
        loading={loading}
        InboxStore={InboxStore}
      />
    </Dashboard>
  )
}));

const Breadcrumbs = ({store}) => {
  return (
    <div className="breadcrumb ">
      <a href="#" className="d-f ai-c" onClick={() => store.setOpenChatWindow(false)}>
        <i className="fas fa-chevron-left mr-"></i>
        Close
      </a>
    </div>
  )
}

const getInbox = async (InboxStore, setLoading) => {
  await checkValidTokens()
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
