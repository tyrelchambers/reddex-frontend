import React, {useState} from 'react';
import Dashboard from '../Dashboard/Dashboard';
import WithNav from '../../layouts/WithNav/WithNav';
import { H1 } from '../../components/Headings/Headings';
import { AddContactForm } from '../../components/Forms/AddContactForm';
import { getAxios } from '../../api';
import { toast } from 'react-toastify';
import { useHistory } from "react-router-dom";

const AddContact = () => {
  const history = useHistory()
  const [ state, setState ] = useState({
    name: "",
    notes: ""
  })

  const stateHandler = (e) => {
    setState({...state, [e.target.name]: e.target.value});
  }
  const saveContactHandler = async (e) => {
    e.preventDefault();
    await getAxios({
      url: '/contacts/save',
      method: 'post',
      data: state
    }).then(res => {
      if (res) {
        toast.success("Contact saved")
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
  );
}

export default AddContact;
