import React, { useState } from 'react'
import firebase from 'firebase';
import './forms.scss';

export default function SignupForm() {
  const [ credentials, setCredentials ] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [ errors, setErrors ] = useState([]);
  

  const submitHandler = async (e) => {
    e.preventDefault();
    const validation = fieldValidation(credentials);
    
    if ( validation ) {
      return setErrors([...validation]);
    };

    const payload = credentials;

    await firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).catch(err => setErrors([...errors, err.message]));

    if ( errors.length > 0 ) {
      return;
    }

    window.location.pathname = "/";
  }

 

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
        <input type="email" className="form-input" placeholder="user@example.com" name="email" onChange={e => setCredentials({...credentials, email: e.target.value})}/>
      </div>

      <div className="field-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-input" placeholder="anything but password123" name="password" onChange={e => setCredentials({...credentials, password: e.target.value})}/>
      </div>

      <div className="field-group">
        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
        <input type="password" className="form-input" placeholder="type your password again" name="confirmPassword" onChange={e => setCredentials({...credentials, confirmPassword: e.target.value})}/>
      </div>

      <div className="field-actions d-f jc-c mt+">
        <button type="submit" className="btn btn-secondary" onClick={submitHandler}>Create Account</button>
      </div>
    </form>
  )
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