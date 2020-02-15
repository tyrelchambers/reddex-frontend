import React, { useState, useEffect } from 'react'
import './ConfirmMessages.scss';
import { MainButton, MinimalButton } from '../Buttons/Buttons';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { getAxios } from '../../api';

const ConfirmMessages = inject("UserStore")(observer(({data, userProfile, removeMessagedAuthor, UserStore}) => {
  const [ defaultMessage, setDefaultMessage ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ loading, setLoading ] = useState(false);
  const [ contact, setContact ] = useState();
  const [ expandContact, setExpandContact ] = useState(false);
  const [authorsMessaged, setAuthorsMessaged] = useState([]);

  useEffect(() => {
    setSubject(data.title.length > 80 ? data.title.slice(0, 77) + '...' : data.title);
  }, [data.title]);

  useEffect(() => {
    messageHandler();
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

  const Username = () => UserStore.getRedditProfile() ? <h4 className="mt- mb-">From: {UserStore.redditProfile.name}</h4> : null;

  const messageHandler = () => {
    let authorExists = false;
    
    authorsMessaged.map(x => x === data.name ? authorExists = true : null);

    if ( authorExists ) {
      setDefaultMessage(userProfile.repeat_message);
    } else {
      setDefaultMessage(userProfile.initial_message);
    }
  }

  const toggleContact = () => {
    setExpandContact(!expandContact)
  }

  return (
    <div className="confirm-messages-wrapper">
      {console.log(contact)}
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
              saveAuthorToDb(data.author, data.post_id);
              saveStoryToUser(data);
              //sendMessageToAuthors(data.author, subject, defaultMessage, removeMessagedAuthor, setLoading);
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

// export const sendMessageToAuthors = async (author, subject, message, removeMessagedAuthor, setLoading) => {
//   const tokens = await fetchTokens().catch(err => false);
//   const fmtSubject = subject;
//   const link = `https://oauth.reddit.com/api/compose`;

//   if (!tokens || !author) return toast.error("Something went wrong");
//   if (!message ) return toast.error("A messaged is needed to send");
//   if ( !fmtSubject ) return toast.error("A subject is needed");
//   if ( fmtSubject.length > 80 ) return toast.error("Subject line is too long");
//   const body = new FormData();
//   body.set('to', `/u/${author}`);
//   body.set("subject", fmtSubject);
//   body.set("text", message);
  
//   await Axios.post(link, body, {
//     headers: {
//       "Authorization": `bearer ${tokens.access_token}`,
//       "Content-Type": "application/x-www-form-urlencoded"
//     }
//   })
//   .then(res => {
//     removeMessagedAuthor();
//     setLoading(false)
//   })
//   .catch(console.log);


// }

export default ConfirmMessages;