import React, { useState, useEffect } from 'react'
import './ConfirmMessages.scss';
import { MainButton, MinimalButton } from '../Buttons/Buttons';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { getAxios } from '../../api';
import Axios from 'axios';
import { toast } from 'react-toastify';
import {fetchTokens} from '../../helpers/renewRefreshToken'
const ConfirmMessages = inject("UserStore", "ModalStore")(observer(({data, removeMessagedAuthor, UserStore}) => {
  const [ defaultMessage, setDefaultMessage ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ contact, setContact ] = useState();
  const [ expandContact, setExpandContact ] = useState(false);
  const [authorsMessaged, setAuthorsMessaged] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const c = await getAxios({
        url: '/contacts/name',
        params: {
          name: data.author
        }
      });
      
      const authors = await getAxios({
        url: '/profile/authors_messaged'
      });

      setAuthorsMessaged([...authors])
      if (c.length > 0) {
        setContact({...c[0]})
      } else {
        setContact()
      }
    }

    fn();

    return () => {
      setExpandContact(false);
    }
  }, [data]);

  useEffect(() => {
    messageHandler();
  }, [data, authorsMessaged])

  const formattedSubject = data.title.length > 80 ? data.title.slice(0, 77) + '...' : data.title;

  const messageHandler = () => {    
    const authorExists = authorsMessaged.filter(x => x.name === data.author);
    if ( authorExists.length > 0 ) {
      setDefaultMessage(UserStore.currentUser.repeat_message);
    } else {
      setDefaultMessage(UserStore.currentUser.initial_message);
    }
  }

  return (
    <div className="confirm-messages-wrapper">
      <h1 className="confirm-title" id="author" data-author={data.author} onClick={() => setExpandContact(!expandContact)}>
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
      <p>From: {UserStore.redditProfile.name}</p>
      <div className="d-f fxd-c">
        <div className="field-group">
          <div className="d-f jc-sb">
            <label htmlFor="subject" className="form-label" >Subject</label> 
          </div>
          <p className="subject">{formattedSubject}</p>
        </div>

        <div className="account-tab mt- mb-">
          <button 
            className=" btn btn-green p- m--"
            onClick={() => setDefaultMessage(UserStore.getUser().initial_message)}
          > Prefill Greeting Message </button>

          <button 
            className=" btn btn-green p- m--"
            onClick={() => setDefaultMessage(UserStore.getUser().repeat_message)}
          > Prefill Recurring Message </button>
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

              sendMessageToAuthors(data.author, formattedSubject, defaultMessage, removeMessagedAuthor, setLoading, data.post_id, data);
            }} 
            value="Message Author"
            loading={loading}
          /> 
        </div>
        
      </div>
    </div>
  )
}));

const saveAuthorToDb = async (name, post_id)=> {
  await getAxios({
    url: '/profile/saveAuthors',
    method: 'post',
    data: {
      name,
      post_id
    }
  })
}

const saveStoryToUser = (data) => {  
  getAxios({
    url: '/profile/save_story',
    method: 'post',
    data
  })
}

 export const sendMessageToAuthors = async (author, subject, message, removeMessagedAuthor, setLoading, post_id, data) => {
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
    saveAuthorToDb(author, post_id);
    saveStoryToUser(data);
    setLoading(false)
   })
   .catch(console.log);
   
 }

export default ConfirmMessages;
