import React from 'react'
import { toast } from 'react-toastify';
import Axios from 'axios';

const Home = ({redditProfile, user, setUser, UserStore}) => {
  const DefaultMessage = () => user.defaultMessage ? <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">{user.defaultMessage}</p> : <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">No default message saved</p>
  const Username = () => redditProfile.subreddit ? <p>From: <span className="highlight-text">{redditProfile.subreddit.display_name_prefixed}</span></p> : null;
  return (
    <section className="default-message mt+ animated fadeIn faster">
      <p className="subtle mt- mb-">This message is used when you haven't messaged an author before. Think of it as an initial greeting. Say hello, introduce yourself, go from there.</p>
      <div className="current-message mt+ mb+">
        <h4 className="form-label">Your current greeting</h4>
        
        <DefaultMessage />
      </div>
      <form className="d-f fxd-c ai-fs">
        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">Your Greeting Message</label>
          <textarea name="defaultMessage" className="textarea" id="defaultMessage" placeholder="Enter default message.." value={user.defaultMessage} onChange={e => setUser({...user, defaultMessage: e.target.value})}></textarea>
        </div>
        
        <div className="d-f jc-sb ai-c w-100pr account-footer">
          <Username/>

          <button className="btn btn-secondary" onClick={(e) => {
            saveMessageHandler(e, user.defaultMessage, UserStore.getToken());
          }}>Save Message</button>
        </div>
      </form>
    </section>
  )
}

const saveMessageHandler = (e, msg, token) => {
  e.preventDefault();
  
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/default_message`, {
    defaultMessage: msg
  }, {
    headers: {
      token
    }
  })
  .then(res => toast.success("Message saved") )
  .catch(err => {
    toast.error("Something went wrong, try again");
    console.log(err);
  });

}

export default Home
