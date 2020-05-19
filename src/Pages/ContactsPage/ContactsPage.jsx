import React, { useEffect, useState} from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { MinimalButton, MainButton } from '../../components/Buttons/Buttons'
import { AddContactForm } from '../../components/Forms/AddContactForm';
import { ContactsList } from '../../components/ContactsList/ContactsList';
 import './ContactsPage.scss'
import { getAxios } from '../../api';
import { H1, H2 } from '../../components/Headings/Headings'
import WithNav from '../../layouts/WithNav/WithNav'
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import HR from '../../components/HR/HR';

export const ContactsPage = () => {
  const [ contacts, setContacts ] = useState([]);
  const [ state, setState ] = useState({
    name: "",
    notes: ""
  })
  const [ sortVal, setSortVal ] = useState("");

  useEffect(() => {
    const fn = async () => {
      const c = await getAxios({
        url: '/contacts/all'
      });
      setContacts([...c])
    }

    fn();

  }, []);

  

  const deleteHandler = async (data) => {
    const copy = contacts;

    const deleteItem = await getAxios({
      url: '/contacts/delete',
      method: 'delete',
      params: {
        id: data
      }
    })
        
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
      <H1>Contacts</H1>
      <WithNav>
        <H2>Search by name</H2>
        <div className="d-f ai-c mt- mb+">
          <Link
            to='/dashboard/contacts/new'
            className="ml- btn btn-tiertiary mr- h-100p p-"
          >
            <i className="fas fa-plus"></i>
            Add Contact
          </Link>

          <input type="text" className="search-large w-100pr max-w-xl" placeholder="Search contact list..." onChange={e => setSortVal(e.target.value)}/>  

        </div>
        <HR/>
        <section className=" mt+ contact-main-wrapper">
          <div className="grid grid-cols-5 gap-3">
            <p className="font-bold text-lg">Name</p>
            <p className="font-bold col-span-3 text-lg">Notes</p>
            <p className="font-bold jc-fe d-f text-lg">Actions</p>
          </div>
          <ContactsList
            contacts={contacts}
            sortVal={sortVal}

            deleteHandler={deleteHandler}
          />
        </section>
      </WithNav>
    </Dashboard>
  )
}
