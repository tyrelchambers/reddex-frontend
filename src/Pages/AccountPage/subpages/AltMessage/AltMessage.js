import React from 'react'
import { toast } from 'react-toastify';
import Axios from 'axios';

const AltMessage = ({redditProfile, user, setUser, UserStore}) => {

  const DefaultMessage = () => user.altMessage ? <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">{user.altMessage}</p> : <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">No alternative message saved</p>
  const Username = () => redditProfile.subreddit ? <p>From: <span className="highlight-text">{redditProfile.subreddit.display_name_prefixed}</span></p> : null;

  return (
    <section className="default-message mt+ animated fadeIn faster">
        <p className="subtle mt- mb-">This is used when you've already messaged an author. It's useful so users don't feel like they're just getting copy and pasted messages.</p>
      <div className="current-message mt+ mb+">
        <h4 className="form-label">Recurring Message</h4>
        <DefaultMessage />
      </div>
      <form className="d-f fxd-c ai-fs">
        <div className="field-group">
          <label htmlFor="defaultMessage" className="form-label">Your Recurring Message</label>
          <textarea name="defaultMessage" className="textarea" id="defaultMessage" placeholder="Enter default message.." value={user.altMessage} onChange={e => setUser({...user, altMessage: e.target.value})}></textarea>
        </div>
        
        <div className="d-f jc-sb ai-c w-100pr account-footer">
          <Username/>

          <button className="btn btn-secondary" onClick={(e) => {
            saveMessageHandler(e, user.altMessage, UserStore.getToken());
          }}>Save Message</button>
        </div>
      </form>
    </section>
  )
}

const saveMessageHandler = (e, msg, token) => {
  e.preventDefault();
  
  Axios.post(`${process.env.REACT_APP_BACKEND}/api/profile/alt_message`, {
    altMessage: msg
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

export default AltMessage
