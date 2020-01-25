import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import './AccountPage.scss';
import Axios from 'axios';
import { inject } from 'mobx-react';
import Home from './subpages/Home/Home';
import AltMessage from './subpages/AltMessage/AltMessage';
import Dashboard from '../Dashboard/Dashboard';
import tabs from './tabs'
import Tabs from '../../layouts/Tabs/Tabs';
import Security from './Security/Security';
import { getInitialGreeting, getRepeatGreeting } from '../../api/get';

const AccountPage = inject("UserStore")(observer(({UserStore}) => {
  const [ redditProfile, setRedditProfile ] = useState({});
  const [ initialGreeting, setInitialGreeting ] = useState({
    text: '',
  });
  const [ repeatGreeting, setRepeatGreeting ] = useState({
    text: ''
  });

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));
    const im = async () => {
      const data = await getInitialGreeting();
      setInitialGreeting({...initialGreeting, ...data[0]})
    }
    const am = async () => {
      const data = await getRepeatGreeting();
      setRepeatGreeting({...repeatGreeting, ...data[0]})
    }

    am()
    im();
    setRedditProfile({...profile});
  }, []);
 

  return (
    <>
    <div className="d-f fxd-c animated fadeIn faster account-wrapper">
      <h1>Account</h1>
        <Tabs url="/dashboard/account" data={tabs}/>

        {params.get("t") === "security" &&
          <Security
            UserStore={UserStore}
          />
        }

        {params.get("t") === "default_message" &&
          <Home
            redditProfile={redditProfile}
            initialGreeting={initialGreeting}
            setInitialGreeting={setInitialGreeting}
          />
        }

        {params.get("t") === "alt_message" &&
          <AltMessage
            redditProfile={redditProfile}
            setRepeatGreeting={setRepeatGreeting}
            repeatGreeting={repeatGreeting}
          />
        }          
      </div>
    </>
  )
}));

export default AccountPage;