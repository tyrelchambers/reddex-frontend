import React, { useState, useEffect } from 'react'
import './InboxMessage.scss';
import isEmpty from '../../helpers/objIsEmpty';
import HR from '../HR/HR';
import InboxChat from '../InboxChat/InboxChat';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { getAxios } from '../../api';

const InboxMessage = inject("InboxStore", "UserStore", "ReadingListStore")(observer(({InboxStore, UserStore, ReadingListStore}) => {
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
        <IsInReadingList />
      </div>
    )
  }

  const IsInReadingList = () => {
    const regex = new RegExp(data.subject)
    const isListed = ReadingListStore.toRead.filter((x, id) => x.title.match(regex))
    
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
