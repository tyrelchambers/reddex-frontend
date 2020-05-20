import React from 'react';
import './Integrations.scss'
import { H2, H1, H2Subtitle } from '../../../components/Headings/Headings'
import { inject, observer } from 'mobx-react';
import { getAxios } from '../../../api';
import { MainButton } from '../../../components/Buttons/Buttons';
import { toast } from 'react-toastify';

const Integrations = ({UserStore}) => {
  const linkPatreonAccount = () => {
    window.location.href = `https://www.patreon.com/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_PATREON_ID}&redirect_uri=${process.env.REACT_APP_REDIRECT}/dashboard/account?t=security&scope=identity identity.memberships`
  }

  const disconnectPatreonAccount = () => {
    getAxios({
      url: '/patreon/disconnect',
      method: 'delete'
    }).then(res => {
      if (res) {
        UserStore.setPatron({})
        toast.success("Patreon successfully disconnected")
      }
    })
  }
  return (
    <section>
      <H2>
        <i className="fab fa-patreon mr-"></i> 
        Connect your Patreon
      </H2>
      <H2Subtitle>Link to your Patreon account in order to receive any benefits supplied by your pledge tier.</H2Subtitle>
      {UserStore.patron.patreon_connected &&
        <MainButton
          value="Diconnect Patreon"
          className="btn-tiertiary danger mt-"
          onClick={disconnectPatreonAccount}
        />
      }
    
    {!UserStore.patron.patreon_connected &&
      <MainButton
        value="Link to your Patreon"
        className="btn btn-green p- mt-"
        onClick={linkPatreonAccount}
      />
    }
    </section>
  );
}

export default inject("UserStore")(observer(Integrations));
