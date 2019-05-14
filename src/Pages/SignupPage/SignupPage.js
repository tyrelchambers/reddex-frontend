import React from 'react'
import './SignupPage.scss';
import SignupForm from '../../components/Forms/SignupForm';

const SignupPage = (props) => {
  return(
    <div className="d-f jc-c ai-c w-100pr h-100v fxd-c">
      <h1 className="mb+">Signup With Reddex</h1>
      <SignupForm />
    </div>
  );
}

export default SignupPage;