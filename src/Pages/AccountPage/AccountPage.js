import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import './AccountPage.scss';
import Axios from 'axios';
import { inject } from 'mobx-react';
import Home from './subpages/Home/Home';
import AccountSubnav from '../../layouts/AccountSubnav/AccountSubnav';
import AltMessage from './subpages/AltMessage/AltMessage';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';

const AccountPage = inject("UserStore")(observer(({UserStore, match}) => {
  const [ user, setUser ] = useState({
    email: "",
    defaultMessage: "",
    altMessage: ""
  });

  const [ redditProfile, setRedditProfile ] = useState({});
  const slug = match.params.account_subpage;

  useEffect(() => {
    getUserProfile(UserStore.getToken());
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

    setRedditProfile({...profile});
  }, []);

  const getUserProfile = (token) => {
    Axios.get(`${process.env.REACT_APP_BACKEND}/api/profile/auth`, {
      headers: {
        "token": token
      }
    })
    .then(res => setUser({...res.data}))
    .catch(console.log);
  }

 

  return (
    <DisplayWrapper hasHeader={true}>
      <div className="d-f fxd-c jc-c ai-c w-100pr animated fadeIn faster account-wrapper">
        <div className="wrapper d-f fxd-c ai-c">
          <h1>Account</h1>
          <h4 className="mt+ ta-c">Your registered email: {user.email}</h4>

          <AccountSubnav/>

          <Template 
            slug={slug}
            redditProfile={redditProfile}
            user={user}
            setUser={setUser}
            UserStore={UserStore} 
          />
        </div>
      </div>
    </DisplayWrapper>
  )
}));

const Template = ({slug, ...rest}) => {
  const template = {
    "default_message": <Home {...rest}/>,
    "alt_message": <AltMessage {...rest}/>
  }

  return template[slug];
}



export default AccountPage;