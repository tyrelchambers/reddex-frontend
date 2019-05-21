import React, { useState, useContext, useEffect } from 'react'
import firebase from 'firebase';
import './forms.scss';
import UserStore from '../../stores/UserStore';
import { observer } from 'mobx-react-lite';
import Axios from 'axios';
import Loading from '../Loading/Loading';

const SignupForm = observer(() => {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [ errors, setErrors ] = useState([]);
  const userStore = useContext(UserStore);
  const [ creationStatus, setCreationStatus ] = useState({
    granted: false,
    triggered: false,
    loading: false
  });

  useEffect(() => {
    getParams();
  }, [])

  const submitHandler = async (e) => {
    e.preventDefault();
    const validation = fieldValidation(credentials);
    if ( validation ) {
      return setErrors([...validation]);
    };

    const tempCreds = {
      ...credentials,
      triggered: true,
      granted: false,
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
      getAccessToken(approvalStatus, createAccount);
    } 
  }

  const renewRefreshToken = async () => {
    const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
    const token = JSON.parse(window.localStorage.getItem('reddit_tokens'));
    await Axios.post('https://www.reddit.com/api/v1/access_token', 
      `grant_type=refresh_code&refresh_token=${token.refresh_token}`
    ,
    {
      headers: {
        "Authorization": `Basic ${encode}`,
      }
    })
    .then(res => window.localStorage.setItem('reddit_tokens', JSON.stringify({
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token
    })))
    .catch(console.log);
  }

  const getAccessToken = async (token, callback) => {
    const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
    await Axios.post('https://www.reddit.com/api/v1/access_token', 
      `grant_type=authorization_code&code=${token}&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup`

    ,
    {
      headers: {
        "Authorization": `Basic ${encode}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    .then(res => window.localStorage.setItem('reddit_tokens', JSON.stringify({
      access_token: res.data.access_token,
      refresh_token: res.data.refresh_token
    })))
    .catch(console.log);

    callback();
  }
  const createAccount = async () => {
    const url = new URLSearchParams(window.location.search);

    const payload = {
      email: JSON.parse(window.sessionStorage.getItem("tempCreds")).email,
      password: JSON.parse(window.sessionStorage.getItem("tempCreds")).password
    };

    const user = await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(res => res.user).catch(err => setErrors([...errors, err.message]));

    if ( errors.length > 0 ) {
      return;
    }
    
    userStore.setUser(user);   
    window.sessionStorage.clear('tempCreds');
    
    console.log(url)
    url.delete('state');
    url.delete('code'); 
    //window.location.pathname = "/";
    
  }

  if ( creationStatus.loading ) {
    return (
      <Loading />
    );
  } else {
    return (
      <form className="form">
        <ul>
          {errors.map((x, id) => (
            <li key={id}>
              <p className="error-text">{x}</p>
            </li>
          ))}
        </ul>
   
        <div className="field-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-input" placeholder="user@example.com" name="email" value={credentials.email} onChange={e => setCredentials({...credentials, email: e.target.value})}/>
        </div>
  
        <div className="field-group">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-input" placeholder="anything but password123" name="password" value={credentials.pasword} onChange={e => setCredentials({...credentials, password: e.target.value})}/>
        </div>
  
        <div className="field-group">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-input" placeholder="type your password again" name="confirmPassword" value={credentials.confirmPassword} onChange={e => setCredentials({...credentials, confirmPassword: e.target.value})}/>
        </div>
  
        <div className="field-actions d-f jc-c mt+">
          <button type="submit" className="btn btn-secondary" onClick={submitHandler}>Create Account</button>
        </div>
      </form>
    )
  }
});

const askForRedditApproval = () => {
    const link = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_APP_NAME}&response_type=code&state=storiesaftermidnightreddex&redirect_uri=${process.env.REACT_APP_REDDIT_REDIRECT}/signup&duration=permanent&scope=privatemessages`;
    window.open(link);
}
const fieldValidation = ({ email, password, confirmPassword }) => {
  const errors = [];

  if ( !email ) {
    errors.push("Email can't be blank");
  }

  if ( !password ) {
    errors.push("Password must be provided");
  }

  if ( !confirmPassword ) {
    errors.push("Please confirm password");
  }

  if ( confirmPassword !== password) {
    errors.push("Passwords must match");
  }

  if ( errors.length > 0 ) return errors;

}

export default SignupForm;