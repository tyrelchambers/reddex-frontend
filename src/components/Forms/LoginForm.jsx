import React from "react";
import "./forms.scss";
import { MainButton } from "../Buttons/Buttons";
import { Link } from "react-router-dom";

export default function LoginForm({
  credentialHandler,
  submitHandler,
  loading,
  setLoading,
}) {
  return (
    <form className="form  with-bg mt-10 rounded-lg p-4 shadow-lg">
      <div className="field-group">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-input"
          placeholder="user@example.com"
          name="email"
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
          placeholder="your password"
          name="password"
          onChange={credentialHandler}
        />
      </div>

      <div className="mt-2 mb-2 flex gap-4">
        <Link to="/authorize" className="link">
          Register
        </Link>
        <Link to="/request-reset" className="link">
          Forgot password?
        </Link>
      </div>

      <div className="flex justify-center">
        <MainButton
          className="btn btn-primary w-full mt-2"
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
  );
}
