import React, {useState, useEffect} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import WithNav from '../../layouts/WithNav/WithNav';
import { H1 } from '../../components/Headings/Headings';
import { AddContactForm } from '../../components/Forms/AddContactForm';
import { getAxios } from '../../api';
import { toast } from 'react-toastify';
import { useHistory, useParams } from "react-router-dom";

const EditContact = () => {
  const history = useHistory()
  const {contact} = useParams()

  const [ state, setState ] = useState({
    name: "",
    notes: ""
  })

  useEffect(() => {
    getAxios({
      url: `/contacts/${contact}`
    }).then(res => {
      if (res) {
        setState({...res})
      }
    })
  }, []);

  const stateHandler = (e) => {
    setState({...state, [e.target.name]: e.target.value});
  }

  const saveContactHandler = async (e) => {
    e.preventDefault();
    await getAxios({
      url: '/contacts/update',
      data: state,
      method: 'patch'
    }).then(res => {
      if (res) {
        toast.success("Contact updated")
        history.push('/dashboard/contacts')
      }
    })

    
  }


  return (
    <Dashboard>
      <H1>Add Contact</H1>
      <WithNav>
        <AddContactForm
          saveContact={saveContactHandler}
          stateHandler={stateHandler}
          state={state}
        />
      </WithNav>
    </Dashboard>
  )
}

export default EditContact;
