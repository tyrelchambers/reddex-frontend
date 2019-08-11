import React from 'react'
import Dashboard from '../Dashboard';
import UserInbox from '../../../components/UserInbox/UserInbox';

const Inbox = () => {
  return (
    <Dashboard>
      <h1>Inbox</h1>

      <UserInbox/>
    </Dashboard>
  )
}

export default Inbox
