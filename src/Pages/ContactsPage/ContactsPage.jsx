import React, { useEffect, useState} from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { MinimalButton } from '../../components/Buttons/Buttons'
import { AddContactForm } from '../../components/Forms/AddContactForm';
import { ContactsList } from '../../components/ContactsList/ContactsList';
import { saveContact, getContacts } from '../../api/post'

export const ContactsPage = () => {
  const [ contacts, setContacts ] = useState([]);
  const [ state, setState ] = useState({
    name: "",
    notes: ""
  })
  const [ sortVal, setSortVal ] = useState("");

  const [ openForm, setOpenForm ] = useState(false);

  useEffect(() => {
    const fn = async () => {
      const c = await getContacts();
      setContacts([...c])
    }

    fn();
  }, []);

  const openFormToggle = () => {
    setOpenForm(!openForm);
  }

  const saveContactHandler = async () => {
    const c = await saveContact(state);
    setContacts([...contacts, {...c}])
  }

  const stateHandler = (e) => {
    setState({...state, [e.target.name]: e.target.value});
  }

 
  return (
    <Dashboard>
      <input type="text" className="search-large w-100pr  mb+" placeholder="Search contact list..." onChange={e => setSortVal(e.target.value)}/>  

      <div className="d-f">
        <h2 className="mr+">Contacts</h2>
        {!openForm &&
          <MinimalButton
            onClick={openFormToggle}
          >
            <i className="fas fa-plus"></i>
            Add Contact
          </MinimalButton>
        }

        {openForm &&
          <MinimalButton
            onClick={openFormToggle}
          >
            <i className="fas fa-minus"></i>
            Hide Form
          </MinimalButton>
        }
      </div>
      <main>
        {openForm &&
          <AddContactForm
            saveContact={saveContactHandler}
            stateHandler={stateHandler}
            state={state}
          />
        }
        
        <ContactsList
          contacts={contacts}
          sortVal={sortVal}
        />
      </main>
    </Dashboard>
  )
}
