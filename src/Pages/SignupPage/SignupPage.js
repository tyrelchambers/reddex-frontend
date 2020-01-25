import React, { useState, useEffect } from 'react'
import './SignupPage.scss';
import {fieldValidationSignup} from '../../helpers/FieldValidation';
import SignupForm from '../../components/Forms/SignupForm';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { inject } from 'mobx-react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { getCurrentAuthenticatedUser } from '../../helpers/renewRefreshToken';

const SignupPage = inject("UserStore")(observer(({UserStore}) => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    access_token: "",
    refresh_token: ""
  });
  const [ errors, setErrors ] = useState([]);
  const [ approved, setApproved ] = useState(false);
  const [ flow, setFlow ] = useState(0);

  const submitHandler = async (e) => {
    e.preventDefault();
    const validation = fieldValidationSignup(credentials);

    if ( validation ) {
      return setErrors([...validation]);
    };

    createAccount();
  }

  useEffect(() => {
    getParams();

  }, [])

  const getParams = () => {
    const params = (new URL(window.location)).searchParams;
    const approvalStatus = params.get("code") ? params.get("code") : false;
    
    if ( approvalStatus !== false ) {
      UserStore.getAccessToken(approvalStatus).then(res => {
        setCredentials({...credentials, access_token: res.access_token, refresh_token: res.refresh_token})
      }).catch(console.log);
      setFlow(1);
      setApproved(true);
    } 
  }

  const createAccount = async () => {
    const { email, password, access_token, refresh_token } = credentials;

    if (!email || !password) return toast.error("No email or password");
    
    const user = await Axios.post(`${process.env.REACT_APP_BACKEND}/api/auth/register`, {
      email,
      password,
      access_token,
      refresh_token
    })
    .then(res => {
      UserStore.setToken(res.data.token);
      return res.data.user;
    })
    .catch(err => toast.error(err.response.data));
    console.log(user)
    const profile = await getCurrentAuthenticatedUser(access_token)
    UserStore.setRedditProfile(profile)
    UserStore.setUser(user);   
  }

  const askForRedditApproval = () => {
    const link = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_APP_NAME}&response_type=code&state=storiesaftermidnightreddex&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup&duration=permanent&scope=privatemessages identity`;
    window.location.href = link;
  }

  const credentialHandler = (e) => {
    return setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  

  if ( UserStore.getUser() ) {
    return (
      <Redirect to="/"/>
    )
  } else {
    return (
      <DisplayWrapper hasHeader={true}>
        <div className="d-f jc-c ai-c signup-wrapper ml-a mr-a h-100v fxd-c p-">
          <div className="wrapper d-f fxd-c ai-c">
            <h1 className="mb+ ta-c">Signup With Reddex</h1>
            <p className="subtle mt+ mb+">In order to signup for a Reddex profile, you'll have to agree to let Reddex access your Reddit profile, but don't worry! Reddex will <em>not</em> use your profile for evil or malicious purposes. This is so you can have access to your inbox, and the ability to send messages to authors.</p>            
            
            <Flow 
              approved={approved}
              askForRedditApproval={askForRedditApproval}
              credentialHandler={credentialHandler}
              credentials={credentials}
              errors={errors}
              submitHandler={submitHandler}
              flow={flow}
              setFlow={setFlow}
            />
          </div>
        </div> 
      </DisplayWrapper>
    );
  }
  
}));

const Flow = ({approved, askForRedditApproval, credentialHandler, credentials, errors, submitHandler, flow, setFlow}) => {
  if (!approved && flow === 0) {
    return(
      <button className="btn btn-primary" onClick={() => {
        setFlow(flow++)
        askForRedditApproval();
      }}>Authenticate With Reddit</button>
    )
  }

  if (flow===1) {
    return (
      <SignupForm 
        credentialHandler={credentialHandler}
        credentials={credentials}
        errors={errors}
        submitHandler={submitHandler}
      />
    )
  }
}

export default SignupPage;