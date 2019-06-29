import React, {useState, useContext } from 'react'
import LoginForm from '../../components/Forms/LoginForm';
import {fieldValidation} from '../../helpers/FieldValidation';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { observer } from 'mobx-react-lite';
import UserStore from '../../stores/UserStore';
import { inject } from 'mobx-react';

const LoginPage = inject("UserStore")(observer(({UserStore}) => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: ""
  });

  const [ errors, setErrors ] = useState([]);  
  const credentialHandler = (e) => {
    return setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const validation = fieldValidation(credentials);
  
    if ( !validation ) {
      return setErrors([...validation]);
    };

    if ( errors.length > 0 ) {
      return;
    }
  
    const payload = credentials;
    
    await Axios.post('http://localhost:3001/api/auth/login', {
      ...payload
    })
    .then(res => {
      UserStore.setToken(res.data);
      window.location.pathname = "/";
    })
    .catch(err => toast.error(err.response.data));
  
   
  
  }
  
  return (
    <div className="d-f jc-c ai-c w-100pr h-100v fxd-c animated fadeIn">
      <h1>Login to Reddex</h1>
      <LoginForm 
        credentialHandler={credentialHandler}
        submitHandler={submitHandler}
        errors={errors}
      />
    </div>
  )
}));

export default LoginPage;