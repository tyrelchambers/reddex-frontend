import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import UserInboxDumb from './UserInboxDumb';
import { inject, observer } from 'mobx-react';
import InboxMessage from '../InboxMessage/InboxMessage';
import Loading from '../Loading/Loading';

const UserInbox = inject("InboxStore")(observer(({InboxStore, loading}) => {
  const [ messages, setMessages ] = useState();
  const [ sortVal, setSortVal ] = useState("");
  const [ loadingBtn, setLoadingBtn ] = useState(false);

  const bodyWidth = document.documentElement.clientWidth;
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

  const showChatComp = InboxStore.openChatWindow || bodyWidth >= 1025 ? <InboxMessage data={InboxStore.getSelectedMessage()}/> : null;

  if ( loading ) return <Loading title="Fetching inbox from Reddit"/>

  return(
    <div className="inbox-wrapper d-f">
      {!InboxStore.openChatWindow &&
        <UserInboxDumb 
          data={messages}
          onClick={(v) => {
            selectHandler(v);

            if ( bodyWidth <= 1024 ) {
              InboxStore.setOpenChatWindow(true);

            }
          }}
          setSortVal={e => setSortVal(e.target.value)}
          selected={InboxStore.getSelectedMessage()}
          getMoreMessages={() => {
            setLoadingBtn(true)
            getMoreMessages(InboxStore, setLoadingBtn)
          }}
          loadingBtn={loadingBtn}
        />
      }

      {showChatComp}
    </div>
  )
}));

const getMoreMessages = async (InboxStore, setLoadingBtn) => {
  const token = await fetchTokens();
  const after = InboxStore.latestAfter;

  Axios.get(`https://oauth.reddit.com/message/messages?after=${after}&count=25`, {
    headers: {
      "Authorization": `bearer ${token.access_token}`
    }
  })
  .then(res => {
    res.data.data.children.shift();
    InboxStore.setMessages({
      data: res.data.data.children,
      after: res.data.data.after
    });
    setLoadingBtn(false)
  })
  .catch(console.log);
}

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
