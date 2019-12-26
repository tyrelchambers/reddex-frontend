import React from 'react';

const SubmissionForm = () => {
  return (
    <form className="form">
      <div className="field-group">
        <label className='form-label' htmlFor="senderName">Your Name or Alias</label>
        <input type="text" className="form-input" name="senderName" placeholder="John Smith" />
      </div>

      <div className="field-group">
        <label className='form-label' htmlFor="senderName">Email</label>
        <input type="text" className="form-input" name="email" placeholder="smith@email.com" />
      </div>

      <div className="field-group">
        <label className='form-label' htmlFor="story">Write your story</label>
        <textarea name="story" className="textarea"></textarea>
      </div>

      <div className="field-group">
        <label className='form-label' htmlFor="sentToOthers">Have you sent this story to anyone else?</label>
        <fieldset style={{borderWidth: 0}}>
          <span className="d-f ai-c">
            <input type="radio" name="sentToOthers" value="Yes" className="mr-"/>
            <p>Yes</p>
          </span>
          <span className="d-f ai-c">
            <input type="radio" name="sentToOthers" value="No" className="mr-"/>
            <p>No</p>
          </span>
        </fieldset>
      </div>

      
    </form>
  );
}

export default SubmissionForm;
