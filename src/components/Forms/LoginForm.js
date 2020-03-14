import React from 'react'
import './forms.scss';
import { MainButton } from '../Buttons/Buttons';
import { Link } from 'react-router-dom'

export default function LoginForm({credentialHandler, submitHandler, loading, setLoading}) {
  return (
    <form className="form p-">
      <div className="field-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="user@example.com" name="email" onChange={credentialHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-input" placeholder="anything but password123" name="password" onChange={credentialHandler}/>
      </div>

      <Link to="/signup" className="link m--">Register</Link>
      <Link to="/request-reset" className="link m--">Forgot password?</Link>

      <div className="d-f jc-c">
        <MainButton 
          className="btn btn-primary w-100pr mt-" 
          onClick={(e) => {
            setLoading(true);
            submitHandler(e);
          }} 
          value="Login"
          loading={loading}
          disabled={loading}
        />
      </div>
    </form>
  )
}
