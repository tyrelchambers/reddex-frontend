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

  const [ errors, setErrors ] = useState([]);  
  const [ loading, setLoading ] = useState(false);
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
    
    await Axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/login`, {
      ...payload
    })
    .then(res => {
      UserStore.setToken(res.data.token);
      UserStore.setCurrentUser(res.data.user)
      UserStore.setRedditProfile(res.data.user.reddit_profile)
      window.localStorage.setItem("reddit_profile", JSON.stringify(res.data.user.reddit_profile))
      window.location.pathname = "/";
    })
    .catch(err => {
      toast.error(err.response.data)
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
          errors={errors}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </DisplayWrapper>
  )
}));

export default LoginPage;