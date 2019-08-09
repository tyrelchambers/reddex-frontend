import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import UserInboxDumb from './UserInboxDumb';
import Dashboard from '../../Pages/Dashboard/Dashboard';

const UserInbox = () => {
  const [ inbox, setInbox ] = useState({
    data: [],
    after: ""
  });
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    setLoading(true);
    getInbox(setInbox, setLoading);
  }, []);

  if ( !loading ) {
    if ( inbox.length === 0 ) return null;
    return(
      <Dashboard>
        {inbox.data.map(x => {
          return (
            <UserInboxDumb 
              data={x.data}
            />
          )
        })}
      </Dashboard>
    )
  } else {
    return null;
  }
}

const filterInbox = (inbox, setInbox)  => {
  const _ = inbox.data.children.filter(x => x.kind === "t4");
  setInbox({
    data: _,
    after: inbox.data.after
  });
}

const getInbox = async (setInbox, setLoading) => {
  const token = await fetchTokens();
  Axios.get(`https://oauth.reddit.com/message/inbox`, {
    headers: {
      "Authorization": `bearer ${token.access_token}`
    }
  })
  .then(res => {
    filterInbox(res.data, setInbox);
    setLoading(false);
  })
  .catch(console.log);
}

export default UserInbox
