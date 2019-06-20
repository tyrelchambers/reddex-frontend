import React, { useState, useContext, useEffect } from 'react'
import './SignupPage.scss';
import firebase from 'firebase';
import UserStore from '../../stores/UserStore';
import {fieldValidationSignup} from '../../helpers/FieldValidation';
import SignupForm from '../../components/Forms/SignupForm';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import AltLoader from '../../components/Loading/AltLoader';
import { toast } from 'react-toastify';

const SignupPage = observer((props) => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [ errors, setErrors ] = useState([]);
  const userStore = useContext(UserStore);
  const [ creationStatus, setCreationStatus ] = useState({
    triggered: false,
    loading: false
  });

  useEffect(() => {
    getParams();
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    const validation = fieldValidationSignup(credentials);

    if ( validation ) {
      return setErrors([...validation]);
    };

    const tempCreds = {
      ...credentials,
      triggered: true,
      loading: true
    }
  
    setCreationStatus({...creationStatus, loading: true});

    window.sessionStorage.setItem('tempCreds', JSON.stringify(tempCreds));

    askForRedditApproval();
   
  }

  const getParams = () => {
    const params = (new URL(window.location)).searchParams;
    const approvalStatus = params.get("code") ? params.get("code") : false;
    const seshStorage = JSON.parse(window.sessionStorage.getItem('tempCreds'));
    
    if ( approvalStatus !== false && seshStorage.triggered === true ) {
      setCreationStatus({...creationStatus, loading: true});
      userStore.getAccessToken(approvalStatus, createAccount);
    } 

    if (!approvalStatus && (sessionStorage.triggered !== true && seshStorage !== null)) return toast.error("Permission not granted. Account not created")

  }

  const createAccount = async () => {
    const payload = {
      email: JSON.parse(window.sessionStorage.getItem("tempCreds")).email,
      password: JSON.parse(window.sessionStorage.getItem("tempCreds")).password
    };

    const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => res.user).catch();

    if ( errors.length > 0 ) {
      return;
    }
    
    userStore.setUser(user);   
    window.sessionStorage.clear('tempCreds');
    window.location.pathname = "/";
    
  }

  const askForRedditApproval = () => {
    const link = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_APP_NAME}&response_type=code&state=storiesaftermidnightreddex&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup&duration=permanent&scope=privatemessages identity`;
    window.location.href = link;
  }

  const credentialHandler = (e) => {
    return setCredentials({...credentials, [e.target.name]: e.target.value});
  }

  if ( creationStatus.loading ) {
    return (
      <AltLoader />
    );
  } else {
    return (
      <div className="d-f jc-c ai-c w-100pr h-100v fxd-c">
        <div className="wrapper d-f fxd-c ai-c">
          <h1 className="mb+">Signup With Reddex</h1>
          <p className="subtle mt+ mb+">In order to signup for a Reddex profile, you'll have to agree to let Reddex access your Reddit profile, but don't worry! Reddex will <em>not</em> use your profile for evil or malicious purposes. If you'd like to know why Reddex needs these permissions, please check out the <Link to="/faq">FAQ</Link>.</p>
          <SignupForm 
            credentialHandler={credentialHandler}
            credentials={credentials}
            errors={errors}
            submitHandler={submitHandler}
          />
        </div>
      </div> 
    );
  }
});

export default SignupPage;