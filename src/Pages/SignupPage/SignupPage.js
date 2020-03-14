import React, { useState, useEffect } from 'react'
import './SignupPage.scss';
import {fieldValidationSignup} from '../../helpers/FieldValidation';
import SignupForm from '../../components/Forms/SignupForm';
import { Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { inject } from 'mobx-react';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { getCurrentAuthenticatedUser } from '../../helpers/renewRefreshToken';
import {checkValidEmail} from '../../helpers/checkValidEmail'
import { getAxios } from '../../api';
import {saveTokensToDb} from '../../helpers/renewRefreshToken';
import { useHistory } from 'react-router-dom'

const SignupPage = inject("UserStore")(observer(({UserStore}) => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    access_token: "",
    refresh_token: ""
  });
  const [ errors, setErrors ] = useState([]);
  const reauth = window.sessionStorage.getItem("reauth")
  const history = useHistory();

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

    // If firefox strict tracking is enabled. User cannot interact with Reddit therefore they won't have required tokens.
    // This allows a user to reauth with reddit

    if ( approvalStatus !== false ) {
      UserStore.getAccessToken(approvalStatus).then(res => {
        if(!res) {
          toast.error("Something went wrong with authentication. Please try again. Redirecting...")
          setTimeout(() => {
            window.location.search=""
            return window.location.pathname="/authorize"
          }, 5000);
        }
        if(!reauth) {
          setCredentials({...credentials, access_token: res.access_token, refresh_token: res.refresh_token})
        } else {
          saveTokensToDb(res.access_token,res.refresh_token).then(res => {
            if( res ) {
              window.sessionStorage.removeItem('reauth')
              window.location.pathname="/"
            }
          })
        }

      })
    } else {
      toast.error("In order to progress, please 'Allow' Reddex to connect to your account. Redirecting...")
      history.push('/authorize');
    }
  }

  const createAccount = async () => {
    const { email, password, access_token, refresh_token } = credentials;
    const profile = await getCurrentAuthenticatedUser(access_token)

    if (!email || !password) return toast.error("No email or password");
    if (!checkValidEmail(email)) return toast.error("Improper email format")
    
    await getAxios({
      url: '/auth/register',
      method: 'post',
      data: {
        email,
        password,
        access_token,
        refresh_token,
        reddit_profile: profile
      },
      options: {
        withToken: false
      }
    }).then(res => {
      if (res) {
        UserStore.setToken(res.token);
        if (res.user.reddit_profile) {
          UserStore.setRedditProfile(res.user.reddit_profile)
        }
        UserStore.setCurrentUser(res.user);  
      }
    })
    
    window.location.pathname="/"

     
  }

  const credentialHandler = (e) => {
    return setCredentials({...credentials, [e.target.name]: e.target.value});
  }  

  if ( UserStore.getUser() && !reauth) {
    return (
      <Redirect to="/"/>
    )
  } else {
    return (
      <DisplayWrapper >
        <div className="d-f jc-c ai-c signup-wrapper ml-a mr-a h-100v fxd-c p- mt+ mb+">
          <div className="wrapper d-f fxd-c ai-c">
            <h1 className="mb+ ta-c">Signup With Reddex</h1>
            <p className="subtle mt+ mb+">In order to signup for a Reddex profile, you'll have to agree to let Reddex access your Reddit profile, but don't worry! Reddex will <em>not</em> use your profile for evil or malicious purposes. This is so you can have access to your inbox, and the ability to send messages to authors.</p>            
            
            <SignupForm 
              credentialHandler={credentialHandler}
              credentials={credentials}
              errors={errors}
              submitHandler={submitHandler}
            />
          </div>
        </div> 
      </DisplayWrapper>
    );
  }
  
}));


export default SignupPage;