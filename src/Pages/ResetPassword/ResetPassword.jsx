import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import ResetPasswordForm from '../../components/Forms/ResetPasswordForm';
import { toast } from 'react-toastify';
import { getAxios } from '../../api';

const ResetPassword = () => {
  const [ password, setPassword ] = useState({
    newPassword: "",
    confirmNewPassword: ""
  })
  const params = new URLSearchParams(window.location.search);

  if ( !params.has('code') ) return <Redirect to="/" />
  
  const stateHandler = (e) => {
    setPassword({...password, [e.target.name]: e.target.value})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      password: password.newPassword.trim(),
      code: params.get("code")
    }
    if ( payload.password.length < 8 ) return toast.error("Password must be longer than 8 characters") 
    if ( payload.password !== password.confirmNewPassword ) return toast.error("Confirmation password and new password, don't match")

    await getAxios({
      url: '/reset',
      data: payload,
      method: 'post',
      options: {
        withToken: false
      }
    })
    .then(res => toast.success("Password reset successful"));

    window.location.search = ""
    window.location.pathname="/login"
  }
  return (
    <DisplayWrapper >
      <div className="d-f fxd-c ai-c mt+">
        <h1>Choose your new password</h1>
        <ResetPasswordForm
          state={password}
          stateHandler={stateHandler}
          submitHandler={submitHandler}
        />
      </div>
    </DisplayWrapper>
  );
}

export default ResetPassword;
