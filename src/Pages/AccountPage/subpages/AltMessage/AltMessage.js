import React from 'react'
import { createNewAltMessage } from '../../../../api/post'
import { updateAltMessage } from '../../../../api/put'
const AltMessage = ({redditProfile, repeatGreeting, setRepeatGreeting}) => {

  const DefaultMessage = () => repeatGreeting.text ? <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">{repeatGreeting.text}</p> : <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">No alternative message saved</p>
  const Username = () => redditProfile.subreddit ? <p>From: <span className="highlight-text">{redditProfile.subreddit.display_name_prefixed}</span></p> : null;

  const saveMessageHandler = async (e) => {
    e.preventDefault();
    
    if (repeatGreeting.uuid) {
      await updateAltMessage(repeatGreeting)
    } else {
      await createNewAltMessage(repeatGreeting.text);
    }

  
  }

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
          <textarea name="defaultMessage" className="textarea" id="defaultMessage" placeholder="Enter default message.." value={repeatGreeting.text || ""} onChange={e => setRepeatGreeting({...repeatGreeting, text: e.target.value})}></textarea>
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



export default AltMessage
