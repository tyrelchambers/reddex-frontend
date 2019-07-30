import React, { useState, useEffect } from 'react'
import './ConfirmMessages.scss';
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';
import { toast } from 'react-toastify';
import { MainButton } from '../Buttons/Buttons';

export default function ConfirmMessages({data, userProfile, removeMessagedAuthor}) {
  const [ defaultMessage, setDefaultMessage ] = useState("");
  const [ subject, setSubject ] = useState("");
  const [ redditProfile, setRedditProfile ] = useState({});
  const [ loading, setLoading ] = useState(false);
  useEffect(() => {
    setSubject(data.title.length > 80 ? data.title.slice(0, 77) + '...' : data.title);
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

    setRedditProfile({...profile});
  }, [data.title]);

  useEffect(() => {
    messageHandler();
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

  return (
    <div className="confirm-messages-wrapper">
      <h1 className="confirm-title" id="author" data-author={data.author}>To: {data.author}</h1>
      <Username/>
      <div className="d-f fxd-c">
        <div className="field-group">
          <div className="d-f jc-sb">
            <label htmlFor="subject" className="form-label" >Subject</label> 
            <CharCounter 
              charCount={subject.length}
            />
          </div>
          <input type="text" className="form-input" placeholder="Enter a subject" name="subject" value={subject} onChange={(e) => {
            setSubject(e.target.value);
          }}/>
        </div>

        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">Message To Send</label>
          <textarea name="defaultMessage" className="default-message-input" id="defaultMessage" placeholder="Enter default message.." value={defaultMessage} onChange={(e) => setDefaultMessage(e.target.value)}></textarea>
        </div>

        <MainButton 
          className="btn btn-primary" 
          onClick={() => {
            setLoading(true);
            saveAuthorToDb(data.author, data.postId);
            sendMessageToAuthors(data.author, subject, defaultMessage, removeMessagedAuthor, setLoading);
          }} 
          value="Message Author"
          loading={loading}
        /> 
        
      </div>
    </div>
  )
}

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
    toast.success(`Message sent to ${author}`)
    removeMessagedAuthor();
    setLoading(false)
  })
  .catch(console.log);


}