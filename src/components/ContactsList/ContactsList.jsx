import React from 'react'
import './ContactsList.scss'

export const ContactsList = ({contacts, sortVal}) => {

  const list = contacts.filter(x => x.name.toLowerCase().includes(sortVal.toLowerCase())).map((x, id) => (
    <li key={id} className="contact-list-item visible d-f ai-c">
      <p className="contact-list-name mr-">{x.name}</p>
      {x.notes &&
        <i className="far fa-clipboard"></i>
      }
    </li>
  ))
  return (
    <ul className="contact-list">
      {list}
    </ul>
  )
}
