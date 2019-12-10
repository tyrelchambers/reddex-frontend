import React, { useState, useEffect } from 'react'
import './ConfirmMessages.scss';
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import { toast } from 'react-toastify';
import { MainButton, MinimalButton } from '../Buttons/Buttons';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { getContact } from '../../api/get';

const ConfirmMessages = inject("UserStore")(observer(({data, userProfile, removeMessagedAuthor, UserStore}) => {
  const [ defaultMessage, setDefaultMessage ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ redditProfile, setRedditProfile ] = useState({});
  const [ loading, setLoading ] = useState(false);
  const [ contact, setContact ] = useState();
  const [ expandContact, setExpandContact ] = useState(false);

  useEffect(() => {
    setSubject(data.title.length > 80 ? data.title.slice(0, 77) + '...' : data.title);
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

    setRedditProfile({...profile});
  }, [data.title]);

  useEffect(() => {
    messageHandler();
    const fn = async () => {
      const c = await getContact(data.author)
      if (c ) {
        setContact({...c})
      } else {
        setContact()
      }
    }

    fn();

    return () => {
      setExpandContact(false);
    }
  }, [data]);

  const Username = () => redditProfile.subreddit ? <h4 className="mt- mb-">From: {redditProfile.subreddit.display_name_prefixed}</h4> : null;

  const messageHandler = () => {
    let authorExists = false;
    
    userProfile.authorsMessaged.map(x => x === data.author ? authorExists = true : null);

    if ( authorExists ) {
      setDefaultMessage(userProfile.altMessage);
    } else {
      setDefaultMessage(userProfile.defaultMessage);
    }
  }

  const toggleContact = () => {
    setExpandContact(!expandContact)
  }

  return (
    <div className="confirm-messages-wrapper">
      <h1 className="confirm-title" id="author" data-author={data.author} onClick={() => toggleContact()}>
        To: {data.author}

        {contact &&
          <span className="modal-contact-toggle ml-">
            <i className="fas fa-address-book mr-"></i>
            <p className="tt-u">Expand</p>
          </span>
        }
      </h1>
      {(contact && expandContact) &&
        <div className="modal-contact-details-wrapper mt-">
          <p>{contact.notes}</p>
        </div>
      }

      <Username/>
      <div className="d-f fxd-c">
        <div className="field-group">
          <div className="d-f jc-sb">
            <label htmlFor="subject" className="form-label" >Subject</label> 
            <CharCounter 
              charCount={subject.length}
            />
          </div>
          <p className="subject">{subject}</p>
        </div>

        <div className="mt-">
          <div className="account-tab mt- mb-">
            <button 
              className=" btn btn-tiertiary m--"
              onClick={() => setDefaultMessage(UserStore.getUser().defaultMessage)}
            > Prefill Greeting Message </button>

            <button 
              className=" btn btn-tiertiary m--"
              onClick={() => setDefaultMessage(UserStore.getUser().altMessage)}
            > Prefill Recurring Message </button>
          </div>
        </div>

        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">Message To Send</label>
          <textarea name="defaultMessage" className="default-message-input" id="defaultMessage" placeholder="Enter default message.." value={defaultMessage} onChange={(e) => setDefaultMessage(e.target.value)}></textarea>
        </div>

        <div className="d-f jc-sb ai-c confirm-actions">
          <MinimalButton
            onClick={() => removeMessagedAuthor()}
            classNames="danger-text"
          >
            Remove from queue
          </MinimalButton>
          <MainButton 
            className="btn btn-primary" 
            onClick={() => {
              setLoading(true);
              saveAuthorToDb(data.author, data.postId);
              saveStoryToUser(data);
              sendMessageToAuthors(data.author, subject, defaultMessage, removeMessagedAuthor, setLoading);
            }} 
            value="Message Author"
            loading={loading}
          /> 
        </div>
        
      </div>
    </div>
  )
}));

const CharCounter = ({charCount}) => {
  return (
    <p className="char-counter"><span className="highlight-text">{charCount}</span> / 80</p>
  );
}

export const saveAuthorToDb = async (author, postId)=> {
  const token = window.localStorage.getItem("token");
  await Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/saveAuthors`, {
    author,
    postId
  }, {
    headers: {
      token
    }
  })
  .then()
  .catch(console.log);
}

const saveStoryToUser = (data) => {
  const token = window.localStorage.getItem('token');
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/save_story`, {
    ...data
  }, {
    headers: {
      token
    }
  })
  .then()
  .catch(console.log);
}

export const sendMessageToAuthors = async (author, subject, message, removeMessagedAuthor, setLoading) => {
  const tokens = await fetchTokens().catch(err => false);
  const fmtSubject = subject;
  const link = `https://oauth.reddit.com/api/compose`;

  if (!tokens || !author) return toast.error("Something went wrong");
  if (!message ) return toast.error("A messaged is needed to send");
  if ( !fmtSubject ) return toast.error("A subject is needed");
  if ( fmtSubject.length > 80 ) return toast.error("Subject line is too long");
  const body = new FormData();
  body.set('to', `/u/${author}`);
  body.set("subject", fmtSubject);
  body.set("text", message);

  await Axios.post(link, body, {
    headers: {
      "Authorization": `bearer ${tokens.access_token}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(res => {
    removeMessagedAuthor();
    setLoading(false)
  })
  .catch(console.log);


}

export default ConfirmMessages;