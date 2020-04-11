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
  const [tags, setTags] = useState([])

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
    addTagHandler()

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

  const addTagHandler = (e) => {
    if (e && e.which === 188 && e.target.value && e.target.value !== ",") {
      setTags([...tags, e.target.value.substring(0, e.target.value.length - 1)])
      e.target.value = ""
    }
  }

  const removeTag = (id) => {
    const clone = [...tags]
    clone.splice(id, 1)
    
    setTags([...clone])
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
      <div className="d-f fxd-c mt-">
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

        <div className="field-group m0 mb-">
          <label htmlFor="" className="form-label">Tags</label>
          <input type="text" className="form-input" placeholder="press enter to save tag" onKeyUp={e => addTagHandler(e)}/>
        </div>
        <div className="d-f fxw-w">
          {tags.map((x, id) => (
            <p className="tag" key={id} onClick={() => removeTag(id)}>{x}</p>
          ))}
        </div>

        <div className="d-f jc-sb ai-c confirm-actions mt+">
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

              sendMessageToAuthors(data.author, formattedSubject, defaultMessage, removeMessagedAuthor, setLoading, data.post_id, data, tags);
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

const saveStoryToUser = async (data) => {  
  return await getAxios({
    url: '/profile/save_story',
    method: 'post',
    data
  })
}

const saveTags = (story_id, tags) => {
  getAxios({
    url: '/tags/save',
    method: 'post',
    data: {
      story_id,
      tags
    }
  })
}

 export const sendMessageToAuthors = async (author, subject, message, removeMessagedAuthor, setLoading, post_id, data, tags) => {
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
   .catch(console.log);

    removeMessagedAuthor();
    saveAuthorToDb(author, post_id);
    const story = await saveStoryToUser(data);
    saveTags(story.uuid, tags)
    setLoading(false)


 }

export default ConfirmMessages;
