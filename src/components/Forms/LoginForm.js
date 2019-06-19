import React from 'react'
import './forms.scss';


export default function LoginForm({credentialHandler, submitHandler, errors}) {
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
        <input type="email" className="form-input" placeholder="user@example.com" name="email" onChange={credentialHandler}/>
      </div>

      <div className="field-group">
        <label htmlFor="password" className="form-label">Password</label>
        <input type="password" className="form-input" placeholder="anything but password123" name="password" onChange={credentialHandler}/>
      </div>

      <div className="field-actions d-f jc-c mt+">
        <button type="submit" className="btn btn-secondary" onClick={submitHandler}>Login</button>
      </div>
    </form>
  )
}
