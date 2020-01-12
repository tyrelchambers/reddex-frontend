import React from 'react';
import { MainButton } from '../Buttons/Buttons'

const ResetPasswordForm = ({state, stateHandler, submitHandler}) => {
  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="newPassword" className="form-label">New Password</label>
        <input type="password" className="form-input" name="newPassword" placeholder="New Password" autoComplete="new-password" name="newPassword" value={state.newPassword} onChange={e => stateHandler(e)}/>
      </div>

      <div className="field-group">
        <label htmlFor="confirmPassword" className="form-label">Confirm New Password</label>
        <input type="password" className="form-input" name="confirmPassword" placeholder="Confirm New Password" autoComplete="new-password" name="confirmNewPassword" value={state.confirmNewPassword} onChange={e => stateHandler(e)}/>
      </div>

      <div className="d-f jc-fe">
        <MainButton
          value="Reset Password"
          className="btn btn-primary"
          onClick={submitHandler}
        />
      </div>
    </form>
  );
}

export default ResetPasswordForm;
