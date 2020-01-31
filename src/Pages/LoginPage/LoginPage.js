import React, {useState } from 'react'
import LoginForm from '../../components/Forms/LoginForm';
import {fieldValidation} from '../../helpers/FieldValidation';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';

const LoginPage = inject("UserStore")(observer(({UserStore}) => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: ""
  });

  const [ loading, setLoading ] = useState(false);
  const credentialHandler = (e) => {
    return setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    if ( !credentials.password ) {
      setLoading(false)
      return toast.error("No password provided")
    }
    if ( !credentials.email ) {
      setLoading(false)
      return toast.error("No email provided");
    }
    const payload = credentials;
    
    await Axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
      ...payload
    })
    .then(res => {
      UserStore.setToken(res.data.token);
      UserStore.setCurrentUser(res.data.user)
      if (res.data.user.reddit_profile) {
        UserStore.setRedditProfile(res.data.user.reddit_profile)
      }
      window.location.pathname = "/";
    })
    .catch(err => {
      toast.error(err.response)
      setLoading(false)
    });
  
   
  
  }
  
  return (
    <DisplayWrapper hasHeader={true}>
      <div className="d-f jc-c ai-c w-100pr mt+ fxd-c animated fadeIn">
        <h1>Login to Reddex</h1>
        <LoginForm 
          credentialHandler={credentialHandler}
          submitHandler={submitHandler}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </DisplayWrapper>
  )
}));

export default LoginPage;