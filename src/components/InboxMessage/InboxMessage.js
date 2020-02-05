import React, { useState, useEffect } from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';
import Axios from 'axios';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { getAxios } from '../../api/get';

const InboxMessage = inject("InboxStore", "UserStore")(observer(({InboxStore, UserStore}) => {
  const [ storyLink, setStoryLink ] = useState("");
  const [ data, setData ] = useState();
  const [ contacts, setContacts ] = useState([]);

  useEffect(() => {
    getStory(InboxStore.getSelectedMessage(), setStoryLink);
    setData(InboxStore.getSelectedMessage());
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
    data.replies.data.children.map(x => {
      msgArr.push(x.data);
    });
  }

  msgArr.push(data);

  const MessageTags = () => {
    if (!storyLink) return null;
    return(
      <div className="d-f ai-c">
        <a href={storyLink} target="_blank" className="message-story-tag">Link to story</a>
        <button className="chat-action primary ai-c" onClick={() => {
          permissionHandler(true, data)
          toast.success("Added to reading list")
        }}>
          <i className="fas fa-bookmark mr-"></i>
          Add to reading List
        </button>
      </div>
    )
  }

  const IsInContacts = () => {
    const isContact = contacts.filter((x, id) => (x.name === data.dest))

    if ( isContact.length === 1 ) {
      return (
        <button className="chat-action ai-c no-action" disabled>
          <i className="fas fa-address-book mr-"></i>
          Already a contact
        </button>
      )
    } else {
      return (
        <button className="chat-action primary ai-c" onClick={() => addToContacts(data)}>
          <i className="fas fa-address-book mr-"></i>
          Add to contacts
        </button>
      )
    }
  }
  
  return (
    <div className="inbox-message-wrapper fx-1 ml+">
      <main>
        <div className="d-f fxd-c inbox-message-header">
          <h2>{data.subject}</h2>
          <p className="mb- message-subtitle">From: {destIsMe(data, UserStore.redditProfile) ? data.author : data.dest}</p>
          <div className="message-tags mb-">
            <MessageTags />
            <IsInContacts />
          </div>

          <HR/>
        </div>
        <InboxChat 
          data={msgArr}
          UserStore={UserStore}
        />
      </main>
    </div>
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
  const token = window.localStorage.getItem('token');
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/set_permission`, {
    author: data.dest,
    title: data.subject,
    permission: bool
  }, {
    headers: {
      token
    }
  })
  .then()
  .catch(console.log)
}

const getStory = (data, setStoryLink) => {
  const token = window.localStorage.getItem('token');
  Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/get_story?title=${data.subject}&author=${data.dest}`, {
    headers: {
      token
    }
  })
  .then(res => setStoryLink(res.data.url))
  .catch(console.log);
}

export const destIsMe = (data, currentUser) => {
  return (data.dest === currentUser.name.replace(/\s/g, ""));
}

export default InboxMessage
