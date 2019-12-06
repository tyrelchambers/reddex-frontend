import React, { useEffect, useState} from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { MinimalButton } from '../../components/Buttons/Buttons'
import { AddContactForm } from '../../components/Forms/AddContactForm';
import { ContactsList } from '../../components/ContactsList/ContactsList';

export const ContactsPage = () => {
  const [ contacts, setContacts ] = useState([]);
  const [ state, setState ] = useState({
    name: "",
    notes: ""
  })
  const addContactToggle = () => {

  }

  const saveContact = () => {
    setContacts([...state])
  }

  const stateHandler = (e) => {
    setState([...contacts, {[e.target.name]: e.target.value}])
  }

  return (
    <Dashboard>
      <div className="d-f">
        <h2 className="mr+">Contacts</h2>
        <MinimalButton
          onClick={addContactToggle}
        >
          <i className="fas fa-plus"></i>
          Add Contact
        </MinimalButton>
      </div>
      <main>
        <AddContactForm
          saveContact={saveContact}
          stateHandler={stateHandler}
          state={state}
        />

        <ContactsList
          contacts={contacts}
        />
      </main>
    </Dashboard>
  )
}
