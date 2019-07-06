import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import './AccountPage.scss';
import Axios from 'axios';
import { inject } from 'mobx-react';

const AccountPage = inject("UserStore")(observer(({UserStore}) => {
  const [ user, setUser ] = useState({
    email: "",
    defaultMessage: ""
  });

  const [ redditProfile, setRedditProfile ] = useState({});
  
  useEffect(() => {
    getUserProfile(UserStore.getToken());
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

    setRedditProfile({...profile});
  }, []);

  const getUserProfile = (token) => {
    Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/auth`, {
      headers: {
        "token": token
      }
    })
    .then(res => setUser({...res.data}))
    .catch(console.log);
  }

  const DefaultMessage = () => user.defaultMessage ? <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">{user.defaultMessage}</p> : <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">No default message saved</p>
  const Username = () => redditProfile.subreddit ? <p>From: <span className="highlight-text">{redditProfile.subreddit.display_name_prefixed}</span></p> : null;

  return (
    <div className="d-f fxd-c jc-c ai-c w-100pr animated fadeIn faster account-wrapper">
      <div className="wrapper d-f fxd-c ai-c">
        <h1>Account</h1>
        <h4 className="mt+ ta-c">Your registered email: {user.email}</h4>

        <section className="default-message mt+">
          <div className="current-message mt+ mb+">
            <h4 className="form-label">Your current default message</h4>
            
            <DefaultMessage />
          </div>
          <form className="d-f fxd-c ai-fs">
            <div className="field-group">
              <label htmlFor="defaultMessage" className="form-label">Your Default Message</label>
              <textarea name="defaultMessage" className="default-message-input" id="defaultMessage" placeholder="Enter default message.." onChange={e => setUser({...user, defaultMessage: e.target.value})}></textarea>
            </div>
            
            <div className="d-f jc-sb ai-c w-100pr account-footer">
              <Username/>

              <button className="btn btn-secondary" onClick={(e) => {
                saveMessageHandler(e, user.defaultMessage, UserStore.getToken());
              }}>Save Message</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
}));

const saveMessageHandler = (e, msg, token) => {
  e.preventDefault();
  
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/default_message`, {
    defaultMessage: msg
  }, {
    headers: {
      token
    }
  })
  .then(console.log)
  .catch(console.log);

}

export default AccountPage;