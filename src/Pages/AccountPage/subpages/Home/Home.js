import React from 'react'
import { createNewDefaultMessage } from '../../../../api/post';
import { updateDefaultMessage } from '../../../../api/put';

const Home = ({redditProfile, setInitialGreeting, initialGreeting}) => {
  const DefaultMessage = () => initialGreeting.text ? <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">{initialGreeting.text}</p> : <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">No default message saved</p>
  const Username = () => redditProfile.subreddit ? <p>From: <span className="highlight-text">{redditProfile.subreddit.display_name_prefixed}</span></p> : null;


  const saveMessageHandler = async (e) => {
    e.preventDefault();
    
    if (initialGreeting.uuid) {
      await updateDefaultMessage(initialGreeting)
    } else {
      await createNewDefaultMessage(initialGreeting.text);
    }

  }

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
          <textarea name="defaultMessage" className="textarea" id="defaultMessage" placeholder="Enter default message.." value={initialGreeting.text || ""} onChange={e => setInitialGreeting({...initialGreeting, text: e.target.value})}></textarea>
        </div>
        
        <div className="d-f jc-sb ai-c w-100pr account-footer">
          <Username/>

          <button className="btn btn-green p-" onClick={(e) => {
            saveMessageHandler(e);
          }}>Save Message</button>
        </div>
      </form>
    </section>
  )
}


export default Home
