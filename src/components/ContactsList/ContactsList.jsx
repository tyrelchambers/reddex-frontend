import React, {useRef, useEffect} from 'react'
import './ContactsList.scss'

export const ContactsList = ({contacts, sortVal, setSelectedContact}) => {


  const list = contacts.filter(x => x.name.toLowerCase().includes(sortVal.toLowerCase())).map((x, id) => (
    <li key={x._id} className="contact-list-item visible" onClick={() => {
      setSelectedContact(x)

    }}>
      <div className="contact-item-icon">
        <i className="fas fa-user"></i>
      </div>
      <div className="contact-list-item-body">
        <h2 className="ta-c">{x.name}</h2>
        {x.notes &&
          <p className="ta-c mt--">Notes included</p>
        }
      </div>
    </li>
  ))
  return (
    <ul className="contact-list">
      {list}
    </ul>
  )
}
