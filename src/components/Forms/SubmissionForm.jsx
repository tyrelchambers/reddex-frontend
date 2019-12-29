import React from 'react';
import { MainButton } from '../Buttons/Buttons';

const SubmissionForm = ({subForm, setSubForm, submitFormHandler}) => {
  return (
    <form className="form">
      <div className="field-group">
        <label className='form-label' htmlFor="senderName">Your Name or Alias</label>
        <input type="text" className="form-input" name="senderName" placeholder="John Smith" value={subForm.senderName} onChange={e => setSubForm({...subForm, [e.target.name]: e.target.value})}/>
      </div>

      <div className="field-group">
        <label className='form-label' htmlFor="email">Email</label>
        <input type="text" className="form-input" name="email" placeholder="smith@email.com" value={subForm.email} onChange={e => setSubForm({...subForm, [e.target.name]: e.target.value})}/>
      </div>

      <div className="field-group">
        <label className='form-label' htmlFor="message">Write your story</label>
        <textarea name="message" className="textarea" value={subForm.message} onChange={e => setSubForm({...subForm, [e.target.name]: e.target.value})}></textarea>
      </div>

      <div className="field-group">
        <label className='form-label' htmlFor="sentToOthers">Have you sent this story to anyone else?</label>
        <div>
          <span className="d-f ai-c">
            <input type="radio" name="sentToOthers" value="Yes" className="mr-"  onChange={e => setSubForm({...subForm, [e.target.name]: true})}/>
            <p>Yes</p>
          </span>
          <span className="d-f ai-c">
            <input type="radio" name="sentToOthers" value="No" className="mr-"  onChange={e => setSubForm({...subForm, [e.target.name]: false})}/>
            <p>No</p>
          </span>
        </div>
      </div>

      <div className="d-f jc-fe">
        <MainButton
          className="btn btn-primary"
          value="Submit Form"
          onClick={submitFormHandler}
        >

        </MainButton>
      </div>
    </form>
  );
}

export default SubmissionForm;
