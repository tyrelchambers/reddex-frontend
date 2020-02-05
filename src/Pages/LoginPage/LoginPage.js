import React, {useState } from 'react'
import LoginForm from '../../components/Forms/LoginForm';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { getAxios } from '../../api';

const LoginPage = inject("UserStore")(observer(({UserStore, history}) => {
  
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

    await getAxios({
      url: '/auth/login',
      method: 'post',
      data: {
        ...payload
      }
    }).then(res => {
      UserStore.setToken(res.token);
      UserStore.setCurrentUser(res.user)
      if (res.user.reddit_profile) {
        UserStore.setRedditProfile(res.user.reddit_profile)
      }
    })   
    window.location.pathname = '/'
  }
  return(
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