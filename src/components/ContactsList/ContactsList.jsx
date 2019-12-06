import React from 'react'

export const ContactsList = ({contacts}) => {
  const list = contacts.map(x => (
    <li>
      {x.name}
    </li>
  ))
  return (
    <div>
      {list}
    </div>
  )
}
