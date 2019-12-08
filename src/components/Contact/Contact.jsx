import React from 'react'
import './Contact.scss'
import { Link } from 'react-router-dom'

export const Contact = ({contact, editHandler, deleteHandler}) => {
  
  return (
    <div className="contact-wrapper">
      <div className="d-f contact-header mb-">
        <h3>{contact.name}</h3>
        <div className="d-f contact-actions ai-c">
          <Link to="/dashboard/contacts?edit=true" onClick={() => editHandler(contact)}>
            <i className="fas fa-edit"></i>
          </Link>
          <i className="fas fa-trash" onClick={() => deleteHandler(contact._id)}></i>
        </div>
      </div>
      {!contact.notes &&
        <p>No notes on this contact</p>
      }
      <p>{contact.notes}</p>
    </div>
  )
}
