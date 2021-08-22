import React from "react";
import "./forms.css";
import { MainButton } from "../Buttons/Buttons";

const SignupForm = ({
  credentialHandler,
  credentials,
  errors,
  submitHandler,
}) => {
  return (
    <form className="form p-4 shadow-lg rounded-lg with-bg">
      <ul>
        {errors.map((x, id) => (
          <li key={id}>
            <p className="danger-text">{x}</p>
          </li>
        ))}
      </ul>
      <div className="field-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          placeholder="user@example.com"
          name="email"
          value={credentials.email}
          onChange={credentialHandler}
        />
      </div>

      <div className="field-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-input"
          placeholder="anything but password123"
          name="password"
          value={credentials.password}
          onChange={credentialHandler}
        />
      </div>

      <div className="field-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          className="form-input"
          placeholder="type your password again"
          name="confirmPassword"
          value={credentials.confirmPassword}
          onChange={credentialHandler}
        />
      </div>

      <div className="field-actions flex justify-center ">
        <MainButton
          value="Create Account"
          onClick={submitHandler}
          className="btn btn-primary mt- w-full"
        />
      </div>
    </form>
  );
};

export default SignupForm;
