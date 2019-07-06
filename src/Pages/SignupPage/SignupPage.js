import React, { useState, useEffect } from 'react'
import './SignupPage.scss';
import {fieldValidationSignup} from '../../helpers/FieldValidation';
import SignupForm from '../../components/Forms/SignupForm';
import { Link, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { inject } from 'mobx-react';

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
  const [ invite, setInvite ] = useState("");

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

    if (performance.navigation.type == 1) {
      setApproved(false);
    } 
  }, [])

  const getParams = () => {
    const params = (new URL(window.location)).searchParams;
    const approvalStatus = params.get("code") ? params.get("code") : false;
    
    if ( approvalStatus !== false ) {
      UserStore.getAccessToken(approvalStatus).then(res => {
        setCredentials({...credentials, access_token: res.access_token, refresh_token: res.refresh_token})
      }).catch(console.log);
      setFlow(2);
      setApproved(true);
    } 
  }

  const createAccount = async () => {
    const { email, password, access_token, refresh_token } = credentials;
    const inviteCode = window.sessionStorage.getItem("invite");
    const user = await Axios.post('http://localhost:3001/api/auth/register', {
      email,
      password,
      access_token,
      refresh_token,
      inviteCode
    })
    .then(res => {
      UserStore.setToken(res.data.token);
      window.sessionStorage.removeItem("invite");
      return res.data.user;
    })
    .catch(console.log);
  
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
      <div className="d-f jc-c ai-c w-708px ml-a mr-a h-100v fxd-c">
        <div className="wrapper d-f fxd-c ai-c">
          <h1 className="mb+">Signup With Reddex</h1>
          <p className="subtle mt+ mb+">In order to signup for a Reddex profile, you'll have to agree to let Reddex access your Reddit profile, but don't worry! Reddex will <em>not</em> use your profile for evil or malicious purposes. If you'd like to know why Reddex needs these permissions, please check out the <Link to="/faq">FAQ</Link>.</p>
          
          
          <Flow 
            approved={approved}
            askForRedditApproval={askForRedditApproval}
            credentialHandler={credentialHandler}
            credentials={credentials}
            errors={errors}
            submitHandler={submitHandler}
            flow={flow}
            setFlow={setFlow}
            invite={invite}
            setInvite={setInvite}
          />
        </div>
      </div> 
    );
  }
  
}));

const Flow = ({approved, askForRedditApproval, credentialHandler, credentials, errors, submitHandler, flow, setFlow, invite, setInvite}) => {
  if (!approved && flow === 1) {
    return(
      <button className="btn btn-primary" onClick={() => {
        setFlow(flow++)
        askForRedditApproval();
      }}>Authenticate With Reddit</button>
    )
  }

  if ( flow === 0 ) {
    return(
      <form className="w-100pr">
        <input type="text" className="form-input w-100pr" placeholder="Enter invite code" onChange={(e) => setInvite(e.target.value)}/>
        <button className="btn btn-secondary mt-" onClick={(e) => {
          inviteHandler(e, setFlow, flow, invite)
        }}>Submit Code</button>
      </form>
    )
  }

  if (flow===2) {
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

const inviteHandler = async (e, setFlow, flow, invite) => {
  e.preventDefault();

  await Axios.get('http://localhost:3001/api/invites', {
    params: {
      inviteCode: invite
    }
  })
  .then(res => {
    if ( res.status === 200 ) {
      toast.success("Token Valid")
      window.sessionStorage.setItem('invite', invite);
      setFlow(flow + 1);
    }
  })
  .catch(console.log);
  
}

export default SignupPage;