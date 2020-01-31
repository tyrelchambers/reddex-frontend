import React, { useEffect, useState} from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { MinimalButton } from '../../components/Buttons/Buttons'
import { AddContactForm } from '../../components/Forms/AddContactForm';
import { ContactsList } from '../../components/ContactsList/ContactsList';
import { saveContact, getContacts, updateContact } from '../../api/post'
import { Contact } from '../../components/Contact/Contact';
import { deleteContact } from '../../api/delete';
 import './ContactsPage.scss'

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

  const saveContactHandler = async (e) => {
    e.preventDefault();
    const url = new URLSearchParams(window.location.search);

    if (url.has("edit")) {
      if ( url.get("edit") === "true" ) {
        const c = await updateContact(state);

       contacts.filter((x, id) => {
         if ( x._id === c._id ) {
          const copy = contacts;
          copy.splice(id, 1, c);
          setContacts([...copy])
        }
       });
      }
      window.location.search = "";
    } else {
      const c = await saveContact(state);
      setContacts([...contacts, {...c}])
    }
    
  }

  const stateHandler = (e) => {
    setState({...state, [e.target.name]: e.target.value});
  }

  const editHandler = (v) => {
    setOpenForm(true)
    setState({...v});
  }

  const deleteHandler = async (data) => {
    const copy = contacts;

    const deleteItem = await deleteContact(data);
    
    if ( deleteItem === "OK" ) {
      contacts.filter((x, id) => {
        if ( x.uuid === data ) {
         copy.splice(id, 1);
         setContacts([...copy])
       }
      });
    }
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
      {openForm &&
          <AddContactForm
            saveContact={saveContactHandler}
            stateHandler={stateHandler}
            state={state}
          />
        }
        
        <section className="d-f mt+ contact-main-wrapper">
          <ContactsList
            contacts={contacts}
            sortVal={sortVal}
  
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
        </section>
    </Dashboard>
  )
}
