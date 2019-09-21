import React from 'react'
import './forms.scss';
import { MainButton } from '../Buttons/Buttons';


export default function LoginForm({credentialHandler, submitHandler, errors, loading, setLoading}) {
  return (
    <form className="form p-">
      <ul>
        {errors.map((x, id) => (
          <li key={id}>
            <p className="error-text">{x}</p>
          </li>
        ))}
      </ul>

      <div className="field-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="user@example.com" name="email" onChange={credentialHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-input" placeholder="anything but password123" name="password" onChange={credentialHandler}/>
      </div>

      <div className="d-f jc-c">
        <MainButton 
          className="btn btn-primary" 
          onClick={(e) => {
            setLoading(true);
            submitHandler(e);
          }} 
          value="Login"
          loading={loading}
        />
      </div>
    </form>
  )
}
