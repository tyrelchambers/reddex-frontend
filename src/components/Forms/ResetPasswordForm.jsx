import React from "react";
import { MainButton } from "../Buttons/Buttons";

const ResetPasswordForm = ({ state, stateHandler, submitHandler }) => {
  return (
    <form className="form">
      <div className="field-group">
        <label htmlFor="newPassword" className="form-label">
          New Password
        </label>
        <input
          type="password"
          className="form-input"
          placeholder="New Password"
          autoComplete="new-password"
          name="newPassword"
          value={state.newPassword}
          onChange={(e) => stateHandler(e)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="confirmNewPassword" className="form-label">
          Confirm New Password
        </label>
        <input
          type="password"
          className="form-input"
          placeholder="Confirm New Password"
          autoComplete="new-password"
          name="confirmNewPassword"
          value={state.confirmNewPassword}
          onChange={(e) => stateHandler(e)}
        />
      </div>

      <div className="flex justify-end">
        <MainButton
          value="Reset Password"
          className="btn btn-primary"
          onClick={submitHandler}
        />
      </div>
    </form>
  );
};

export default ResetPasswordForm;
