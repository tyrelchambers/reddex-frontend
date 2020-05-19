import React, { useState, useEffect } from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { getAxios } from '../../api';
import Dashboard from '../../Pages/Dashboard/Dashboard';
import WithNav from '../../layouts/WithNav/WithNav';
import tabs from './tabs'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { checkValidTokens } from '../../helpers/checkValidTokens';
import { fetchTokens } from '../../helpers/renewRefreshToken';

const InboxMessage = inject("InboxStore", "UserStore", "ReadingListStore")(observer(({InboxStore, UserStore, ReadingListStore}) => {
  const [ storyLink, setStoryLink ] = useState("");
  const [ data, setData ] = useState();
  const [ contacts, setContacts ] = useState([]);
  const [ isContact, setIsContact ] = useState(false)
  const {message} = useParams();

  useEffect(() => {
    // getStory(InboxStore.getSelectedMessage(), setStoryLink);
    // setData(InboxStore.getSelectedMessage());
    const fn = async () => {
      await checkValidTokens()
      const token = await fetchTokens();  
      await Axios.get(`https://oauth.reddit.com/message/messages/${message}`, {
        headers: {
          "Authorization": `bearer ${token.access_token}`
        }
      }).then(res => {
        setData(res.data.data.children[0].data)
      })
    }

    fn();
  }, [InboxStore.selectedMessage]);

  useEffect(() => {
    const fn = async () => {
      const c = await getAxios({
        url: '/contacts/all'
      });
      setContacts([...c])
    }

    fn();
  }, [data])

  if ( isEmpty(data) ) return null;

  const msgArr = [];

  if ( !isEmpty(data.replies) ) {
    data.replies.data.children.forEach(x => {
      msgArr.push(x.data);
    });
  }

  msgArr.push(data);

  const IsInReadingList = () => {
    if (!storyLink) return null;

    let isListed = ReadingListStore.toRead.filter((x, id) => data.subject === x.title)

    if (isListed.length > 0) {
      return (
        <button className="chat-action ai-c no-action" disabled>
          <i className="fas fa-bookmark mr-"></i>
          In reading list
        </button>
      )
    } else {
      return (
        <button className="chat-action primary ai-c" onClick={() => {
          permissionHandler(true, data)
          toast.success("Added to reading list")
        }}>
          <i className="fas fa-bookmark mr-"></i>
          Add to reading List
        </button>
      )
    }    
  }

  const IsInContacts = () => {
    const contact = contacts.filter((x, id) => (x.name === data.dest))

    if ( contact.length === 1 || isContact) {
      return (
        <button className="chat-action ai-c no-action" disabled>
          <i className="fas fa-address-book mr-"></i>
          Already a contact
        </button>
      )
    } else {
      return (
        <button className="chat-action primary ai-c" onClick={() => {
          addToContacts(data)
          setIsContact(true)
          toast.success("Contact saved")
        }}>
          <i className="fas fa-address-book mr-"></i>
          Add to contacts
        </button>
      )
    }
  }
  
  return (
    <Dashboard>
      <WithNav tabs={tabs}>
        <div className="inbox-message-wrapper fx-1 ">
          <main>
            <div className="d-f fxd-c inbox-message-header">
              <h2>
                <a href={storyLink} target="_blank" rel="noopener noreferrer">{data.subject}</a>
              </h2>
              <p className="mb- message-subtitle">From: <a href={`https://reddit.com/u/${destIsMe(data, UserStore.redditProfile) ? data.author : data.dest}`} target="_blank" rel="noopener noreferrer"  >{destIsMe(data, UserStore.redditProfile) ? data.author : data.dest}</a> </p>
              <div className="message-tags mb-">
                <IsInReadingList/>
                <IsInContacts/>
              </div>

              <HR/>
            </div>
            <InboxChat 
              data={msgArr}
              UserStore={UserStore}
            />
          </main>
        </div>
      </WithNav>
    </Dashboard>
  )
}));

const addToContacts = (user) => {
  getAxios({
    url: '/contacts/save',
    method: 'post',
    data: {name: user.dest}
  })
}

const permissionHandler = (bool, data) => {
  getAxios({
    url: '/profile/set_permission',
    method: 'post',
    data: {
      author: data.dest,
      title: data.subject,
      permission: bool
    }
  })
}

const getStory = (data, setStoryLink) => {
  getAxios({
    url: `/profile/get_story?title=${data.subject}&author=${data.dest}`
  }).then(res => setStoryLink(res.url))
}

export const destIsMe = (data, currentUser) => {
  return (data.dest === currentUser.name.replace(/\s/g, ""));
}

export default InboxMessage
