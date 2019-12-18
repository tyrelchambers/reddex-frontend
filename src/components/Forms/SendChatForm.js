
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
    .then(res => {
      sentMsg(res.data.jquery[30][3][0][0].data);
      setMsg("");
    })
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
