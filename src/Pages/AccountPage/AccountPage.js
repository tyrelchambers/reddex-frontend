import React, {useContext, useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import UserStore from '../../stores/UserStore';
import './AccountPage.scss';
import Axios from 'axios';

const AccountPage = observer(() => {
  const store = useContext(UserStore);
  const [ user, setUser ] = useState({
    email: "",
    defaultMessage: ""
  });

  const [ redditProfile, setRedditProfile ] = useState({});
  
  useEffect(() => {
    getUserProfile(store.getToken());
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

    setRedditProfile({...profile});
  }, []);

  const getUserProfile = (token) => {
    Axios.get('http://localhost:3001/api/profile/auth', {
      headers: {
        "token": token
      }
    })
    .then(res => setUser({...res.data}))
    .catch(console.log);
  }

  const DefaultMessage = () => user.defaultMessage ? <p className="mw-500 lh-1-8 mt+ default-message-holder" id="defaultMessageHolder">{user.defaultMessage}</p> : <p className="mw-500 lh-1-8 mt+ default-message-holder" id="defaultMessageHolder">No default message saved</p>
  const Username = () => redditProfile.subreddit ? <p>From: <span className="highlight-text">{redditProfile.subreddit.display_name_prefixed}</span></p> : null;

  return (
    <div className="d-f fxd-c jc-c ai-c w-100pr h-100v">
      <div className="wrapper d-f fxd-c ai-c">
        <h1>Account</h1>
        <h4 className="mt+">Your registered email: {user.email}</h4>

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
            
            <div className="d-f jc-sb ai-c w-100pr">
              <Username/>

              <button className="btn btn-secondary" onClick={(e) => {
                saveMessageHandler(e, user.defaultMessage, store.getToken());
              }}>Save Message</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
});

const saveMessageHandler = (e, msg, token) => {
  e.preventDefault();
  
  Axios.post('http://localhost:3001/api/profile/default_message', {
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