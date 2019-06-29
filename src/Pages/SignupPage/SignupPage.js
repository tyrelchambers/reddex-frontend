import React, { useState, useEffect } from 'react'
import './SignupPage.scss';
import {fieldValidationSignup} from '../../helpers/FieldValidation';
import SignupForm from '../../components/Forms/SignupForm';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import Axios from 'axios';
import { inject } from 'mobx-react';

const SignupPage = inject("UserStore")(observer(({UserStore}) => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [ errors, setErrors ] = useState([]);
  const [ approved, setApproved ] = useState(false);

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
      UserStore.getAccessToken(approvalStatus);
      setApproved(true);
    } 
  }

  const createAccount = async () => {
    const { email, password } = credentials;
    const user = await Axios.post('http://localhost:3001/api/auth/register', {
      email,
      password
    })
    .then(res => {
      UserStore.setToken(res.data.token);
      return res.data.user;
    })
    .catch(console.log);
  
    UserStore.setUser(user);   
    window.location.pathname = "/";
  }

  const askForRedditApproval = () => {
    const link = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_APP_NAME}&response_type=code&state=storiesaftermidnightreddex&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup&duration=permanent&scope=privatemessages identity`;
    window.location.href = link;
  }

  const credentialHandler = (e) => {
    return setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  return (
    <div className="d-f jc-c ai-c w-100pr h-100v fxd-c">
      <div className="wrapper d-f fxd-c ai-c">
        <h1 className="mb+">Signup With Reddex</h1>
        <p className="subtle mt+ mb+">In order to signup for a Reddex profile, you'll have to agree to let Reddex access your Reddit profile, but don't worry! Reddex will <em>not</em> use your profile for evil or malicious purposes. If you'd like to know why Reddex needs these permissions, please check out the <Link to="/faq">FAQ</Link>.</p>
 
        {approved &&
          <SignupForm 
            credentialHandler={credentialHandler}
            credentials={credentials}
            errors={errors}
            submitHandler={submitHandler}
          />
        }

        {!approved &&
          <button className="btn btn-primary" onClick={askForRedditApproval}>Authenticate With Reddit</button>
        }
      </div>
    </div> 
  );
  
}));

export default SignupPage;