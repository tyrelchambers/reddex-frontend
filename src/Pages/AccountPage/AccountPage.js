import React, {useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import './AccountPage.scss';
import { inject } from 'mobx-react';
import Home from './subpages/Home/Home';
import AltMessage from './subpages/AltMessage/AltMessage';
import tabs from './tabs'
import Tabs from '../../layouts/Tabs/Tabs';
import Security from './Security/Security';
import Dashboard from '../Dashboard/Dashboard';
import { getAxios } from '../../api';

const AccountPage = inject("UserStore")(observer(({UserStore}) => {
  const [ initialGreeting, setInitialGreeting ] = useState("");
  const [ repeatGreeting, setRepeatGreeting ] = useState("");

  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const im = async () => {
      const data = await getAxios({
        url: "/default_message"
      });
      setInitialGreeting(data.initial_message)
    }
    const am = async () => {
      const data = await getAxios({
        url: "/alt_message"
      });
      setRepeatGreeting(data.repeat_message)
    }

    am()
    im();
  }, []);
 

  return (
    <Dashboard>
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
            UserStore={UserStore}
            initialGreeting={initialGreeting}
            setInitialGreeting={setInitialGreeting}
          />
        }

        {params.get("t") === "alt_message" &&
          <AltMessage
            UserStore={UserStore}
            setRepeatGreeting={setRepeatGreeting}
            repeatGreeting={repeatGreeting}
          />
        }          
      </div>
    </Dashboard>
  )
}));

export default AccountPage;