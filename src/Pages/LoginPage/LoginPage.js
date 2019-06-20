import React, {useState } from 'react'
import LoginForm from '../../components/Forms/LoginForm';
import {fieldValidation} from '../../helpers/FieldValidation';
import firebase from 'firebase';
import { toast } from 'react-toastify';

export default function LoginPage() {
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
  
    const payload = credentials;
  
    await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).catch(err => {
      toast.error(err.message);
    });
  
    if ( errors.length > 0 ) {
      return;
    }
  
    window.location.pathname = "/";
  }
  
  return (
    <div className="d-f jc-c ai-c w-100pr h-100v fxd-c">
      <h1>Login to Reddex</h1>
      <LoginForm 
        credentialHandler={credentialHandler}
        submitHandler={submitHandler}
        errors={errors}
      />
    </div>
  )
}



