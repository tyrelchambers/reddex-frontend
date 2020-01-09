import React from 'react'
import './forms.scss'
import { MainButton } from '../Buttons/Buttons'

export const ImportStoryForm = ({setURL, submitHandler, loading}) => {
  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="url" className="form-label">Story URL</label>
        <input type="url" className="form-input" name="url" placeholder="Paste URL here..." onChange={setURL} autoFocus={true}/>
      </div>
      <div className="d-f ai-c jc-fe">
        <MainButton
          className="btn btn-primary" 
          value="Import Story"
          onClick={e => submitHandler(e)}
          loading={loading}
        >
          <i className="fas fa-check mr-"></i>
        </MainButton>
      </div>
    </form>
  )
}
