/*  author: String
    body: String
    body_html: String
    context: ""
    created: 1565468453
    created_utc: 1565439653
    dest: String
    distinguished: null
    first_message: null
    first_message_name: null
    id: "idkd00"
    likes: null
    name: "t4_idkd00"
    new: false
    num_comments: null
    parent_id: null
    replies:
        data:
        after: null
        before: null
        children: Array(1)
        0:
        data:
        author: String
        body: "Sure! Thanks for asking. Please make sure to credit me, obviously."
        body_html: String
        context: ""
        created: 1565495258
        created_utc: 1565466458
        dest: "StoriesAfterMidnight"
        distinguished: null
        first_message: 1111176144
        first_message_name: "t4_idkd00"
        id: "ids5tr"
        likes: null
        name: "t4_ids5tr"
        new: true
        num_comments: null
        parent_id: "t4_idkd00"
        replies: ""
        score: 0
        subject: "re: I asked my girlfriend to lose weight"
        subreddit: null
        subreddit_name_prefixed: null
        was_comment: false
    score: 0
    subject: "I asked my girlfriend to lose weight"
    subreddit: null
    subreddit_name_prefixed: null
    was_comment: false
*/
import React, { useState } from 'react'
import './forms.scss';
import '../Buttons/buttons.scss';
import Axios from 'axios';
import { fetchTokens } from '../../helpers/renewRefreshToken';

const SendChatForm = ({user, sentMsg}) => {
  const [ msg, setMsg ] = useState("");

  function autoGrow (oField) {
    if ( oField.scrollHeight >= 300 ) {
      oField.style.height = "300px";
      return false;
    }
    if (oField.scrollHeight > oField.clientHeight) {
      oField.style.height = oField.scrollHeight + "px";
    }
  }

  const submitHandler = async e => {
    e.preventDefault();

    const tokens = await fetchTokens();
    const thing_id = user.name;
    const text = msg;
    
    const body = new FormData();
    body.set('thing_id', thing_id);
    body.set("text", text);
    body.set("return_rtjson", true);

    Axios.post(`https://oauth.reddit.com/api/comment`, body, {
      headers: {
        "Authorization":  `bearer ${tokens.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(res => sentMsg(res.data.jquery[30][3][0][0].data))
    .catch(console.log);
  }

  return (
    <form method="POST" className="chat-send-form">
      <textarea type="text" placeholder="Send a message" value={msg} className="chat-input" id="chatTextarea" onChange={(e) => {
        autoGrow(e.target);
        setMsg(e.target.value);
      }}/>  
      <button className="chat-send" onClick={submitHandler}>
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  )
}



export default SendChatForm
