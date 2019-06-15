import React from 'react'
import './SignupPage.scss';
import SignupForm from '../../components/Forms/SignupForm';
import { Link } from 'react-router-dom';

const SignupPage = (props) => {
  return(
    <div className="d-f jc-c ai-c w-100pr h-100v fxd-c">
      <div className="wrapper d-f fxd-c ai-c">
        <h1 className="mb+">Signup With Reddex</h1>
        <p className="subtle mt+ mb+">In order to signup for a Reddex profile, you'll have to agree to let Reddex access your Reddit profile, but don't worry! Reddex will <em>not</em> use your profile for evil or malicious purposes. If you'd like to know why Reddex needs these permissions, please check out the <Link to="/faq">FAQ</Link>.</p>
        <SignupForm />
      </div>
    </div>
  );
}

export default SignupPage;