import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import UserInboxDumb from './UserInboxDumb';
import { inject, observer } from 'mobx-react';
import InboxMessage from '../InboxMessage/InboxMessage';
import Loading from '../Loading/Loading';

const UserInbox = ({InboxStore, loading}) => {
  const [ showChat, setShowChat ] = useState(false);

  const selectHandler = (msg) => {
    return InboxStore.setSelectedMessage(msg);
  }

  const showChatComp = showChat ? <InboxMessage data={InboxStore.getSelectedMessage()}/> : null;

  if ( loading ) return <Loading title="Fetching inbox from Reddit"/>

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
};


export default UserInbox
