import React from 'react'
import { Link } from 'react-router-dom'
import './ContactsList.scss'

export const ContactsList = ({contacts, sortVal, editHandler, deleteHandler}) => {


  const list = contacts.filter(x => x.name.toLowerCase().includes(sortVal.toLowerCase())).map((x, id) => (
    <li key={x.id} className="contact-list-item visible">
      <div className="contact-item-header">
        <h2>{x.name}</h2>
      </div>
      <div className="contact-list-item-body">
        {x.notes &&
          <p className=" mt--">{x.notes}</p>
        }
        {!x.notes &&
          <p className="mt--">No notes on contact</p>
        }
      </div>
      <div className="d-f contact-actions">
        <Link className="edit" to="/dashboard/contacts?edit=true" onClick={() => editHandler(x)}>
          Edit Contact
        </Link>
        <i className="fas fa-trash delete" onClick={() => deleteHandler(x.uuid)}></i>
      </div>
    </li>
  ))
  return (
    <ul className="contact-list">
      {list}
    </ul>
  )
}
