import React from 'react'
import { getAxios } from '../../../../api';
import { toast } from 'react-toastify';
import { MainButton } from '../../../../components/Buttons/Buttons';
const AltMessage = ({UserStore, repeatGreeting, setRepeatGreeting}) => {

  const DefaultMessage = () => repeatGreeting ? <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">{repeatGreeting}</p> : <p className="mw-500 lh-1-8 default-message-holder" id="defaultMessageHolder">No alternative message saved</p>
  const Username = () => UserStore.getRedditProfile() ? <p>From: <span className="highlight-text">{UserStore.getRedditProfile().name}</span></p> : null;

  const saveMessageHandler = async (e) => {
    e.preventDefault();
    
    await getAxios({
      url: '/alt_message',
      method: 'post',
      data: {
        text: repeatGreeting
      }
    }).then(res => {
      if (res) return toast.success("Greeting saved")
    })
  
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
          <textarea name="defaultMessage" className="textarea" id="defaultMessage" placeholder="Enter default message.." value={repeatGreeting || ""} onChange={e => setRepeatGreeting(e.target.value)}></textarea>
        </div>
        
        <div className="d-f jc-sb ai-c w-100pr account-footer">
          <Username/>

          <MainButton
            className="btn btn-green p-"
            onClick={(e) => saveMessageHandler(e)}
            value="Save Message"
          />
        </div>
      </form>
    </section>
  )
}



export default AltMessage
