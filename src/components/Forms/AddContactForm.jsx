import React from 'react'
import './forms.scss'
import { MainButton } from '../Buttons/Buttons'

export const AddContactForm = ({saveContact, stateHandler, state}) => {
  return (
    <div className="form">
      <div className="field-group">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-input" placeholder="John" name="name" value={state.name} onChange={e => stateHandler(e)}/>
      </div>

      <div className="field-group">
        <label htmlFor="" className="form-label">Notes</label>
        <textarea type="text" className="textarea" placeholder="Add your notes..." value={state.notes} onChange={e => stateHandler(e)}/>
      </div>

      <div className="d-f jc-fe">
        <MainButton
          className="btn btn-primary"
          onClick={saveContact} 
        >
          <i className="fas fa-plus"></i>
          Save Contact
        </MainButton>
      </div>
    </div>
  )
}
