import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import './ContactsList.scss'
import Dropdown from '../Dropdown/Dropdown'

export const ContactsList = ({contacts, sortVal, deleteHandler}) => {
  const [ openDropdown, setOpenDropdown] = useState("")

  const list = contacts.filter(x => x.name.toLowerCase().includes(sortVal.toLowerCase())).map((x, id) => (
    <li key={id} className="contact-list-item visible grid grid-cols-5 mt- gap-3 cell-row">
      <p>{x.name}</p>

      {x.notes &&
        <details className="note-wrapper col-span-3">
          <summary>
            <i className="fas fa-arrow-right"></i>
            <p>{x.notes}</p>
          </summary>
          <p>{x.notes}</p>
        </details>
      }
      {!x.notes &&
        <p className="col-span-3">No notes on contact</p>
      }
      <div className="d-f jc-fe">
      <Dropdown
        triggerIcon={ <i className="fas fa-ellipsis-h"></i> }
        width="55px"
        showDropdown={() => {
          if (openDropdown === x.uuid) {
            return true
          }
        }}
        toggleDropdown={() => {
          setOpenDropdown(x.uuid)
          if (openDropdown === x.uuid) {
            setOpenDropdown("")
          }
        }}
      >
        <Link className="edit" to={`/dashboard/contacts/${x.uuid}/edit`}>
          Edit Contact
        </Link>
        <button onClick={() => deleteHandler(x.uuid)}>
          Delete contact
        </button>
      </Dropdown>
      </div>

    </li>
  ))
  return (
    <ul className="contact-list w-100pr mt-">
      {list}
    </ul>
  )
}
