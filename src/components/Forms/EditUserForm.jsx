import React from 'react';
import './forms.scss'
import HR from '../../components/HR/HR'
import { MainButton } from '../Buttons/Buttons';
const EditUserForm = ({stateHandler, submitHandler}) => {
  return (
    <form className="form" >
      <div className="field-group">
        <label htmlFor="email" className="form-label">Email</label>
        <input type="email" className="form-input" placeholder="user@example.com" name="email" onChange={e => stateHandler(e)}/>
      </div>

      <HR />

      <div className="field-group">
        <label htmlFor="currentPasswowrd" className="form-label">Current Password</label>
        <input type="password" className="form-input" name="currentPassword" placeholder="Current Password" autoComplete="new-password" onChange={e => stateHandler(e)}/>
      </div>

      <div className="field-group">
        <label htmlFor="newPassword" className="form-label">New Password</label>
        <input type="password" className="form-input" name="newPassword" placeholder="New Password" autoComplete="new-password" onChange={e => stateHandler(e)}/>
      </div>

      <div className="field-group">
        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
        <input type="password" className="form-input" name="confirmPassword" placeholder="Confirm New Password" autoComplete="new-password" onChange={e => stateHandler(e)}/>
      </div>

      <HR />

      <div className="d-f jc-fe pt-">
      <MainButton
        value="Save Changes"
        className="btn btn-green p-"
        onClick={submitHandler}
      />
      </div>
    </form>
  );
}

export default EditUserForm;
