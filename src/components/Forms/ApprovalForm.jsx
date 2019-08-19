import React from 'react'

const ApprovalForm = ({submitHandler, data, dataHandler}) => {
  return (
    <form className="mw-500">
      <div className="field-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="text" className="input" placeholder="user@example.com" name="email" onChange={dataHandler} value={data.email}/>
      </div>

      <div className="field-group">
        <label htmlFor="fullName" className="form-label">Your Name</label>
        <input type="text" className="input" placeholder="John Smith" name="fullName" onChange={dataHandler} value={data.fullName}/>
      </div>

      <div className="field-group">
        <label htmlFor="youtubeChannel" className="form-label">Youtube Channel</label>
        <input type="text" className="input" placeholder="Youtube channel name" name="youtubeChannel" onChange={dataHandler} value={data.youtubeChannel}/>
      </div>

      <div className="field-group">
        <label htmlFor="youtubeLink" className="form-label">Youtube Channel Link</label>
        <input type="text" className="input" placeholder="Link to your youtube channel" name="youtubeLink" onChange={dataHandler} value={data.youtubeLink}/>
      </div>

      <div className="field-group">
        <label htmlFor="channelType" className="form-label">What's Your Channel About?</label>
        <textarea type="text" row="15" className="textarea" placeholder="Tell me about your channel" name="channelType" onChange={dataHandler} value={data.channelType}/>
      </div>

      <div className="field-actions d-f jc-c mt+">
        <button type="submit" className="btn btn-secondary" onClick={submitHandler}>Submit Form</button>
      </div>
    </form>
  )
}


export default ApprovalForm
