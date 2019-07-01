import React, { useState, useEffect } from 'react'
import './ConfirmMessages.scss';
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';

export default function ConfirmMessages({data, index, setIndex, userProfile}) {
  const [ defaultMessage, setDefaultMessage ] = useState("");
  const [ subject, setSubject ] = useState("");
  const mockUser = ['ChapStique43', 'storiesaftermidnight'];

  useEffect(() => {
    setSubject(data.title);
  }, [data.title]);
  
  useEffect(() => {
    setDefaultMessage(userProfile.defaultMessage);
  }, [data]);

  return (
    <div className="confirm-messages-wrapper">
      <h1 className="confirm-title" id="author" data-author={data.author}>To: {data.author}</h1>

      <div className="d-f fxd-c mt+">
        <div className="field-group">
          <label htmlFor="subject" className="form-label" >Subject</label>
          <input type="text" className="form-input" placeholder="Enter a subject" name="subject" value={subject.length > 100 ? subject.slice(0, 97) + '...' : subject} onChange={(e) => setSubject(e.target.value)}/>
        </div>

        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">Your Default Message</label>
          <textarea name="defaultMessage" className="default-message-input" id="defaultMessage" placeholder="Enter default message.." value={defaultMessage} onChange={(e) => setDefaultMessage(e.target.value)}></textarea>
        </div>

        <button className="btn btn-primary" onClick={() => {
          sendMessageToAuthors(mockUser, subject, defaultMessage, index, setIndex);
        }} >Message Author</button>
      </div>
    </div>
  )
}

export const sendMessageToAuthors = async (author, subject, message, index, setIndex) => {
  const tokens = await fetchTokens();
  const fmtSubject = subject;
  console.log(tokens);
  const link = `https://oauth.reddit.com/api/compose`;
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
  .then(res => setIndex(index + 1))
  .catch(console.log);
  
}