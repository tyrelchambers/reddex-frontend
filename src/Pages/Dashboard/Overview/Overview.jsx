import React, {useEffect, useState} from 'react'
import YouTubeStats from '../../../components/YouTubeStats/YouTubeStats';
import HR from '../../../components/HR/HR';
import { inject, observer } from 'mobx-react';
import './Overview.scss';

const Overview = inject("UserStore")(observer(({UserStore}) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const u = UserStore.getUser()
    setProfile(u)
  }, []);

  if ( !profile ) return null;

  return (
    <>
      <div className="quick-actions">
        <h3 className="mb-">Quick Actions</h3>
        
        <div className="quick-actions-body">
          {profile.website.subdomain &&
            <a href={`https://${profile.website.subdomain}.reddex.app`} rel="noopener noreferrer" target="_blank" className="td-n link action"><i className="fas fa-external-link-square-alt mr---"></i> View your site</a>
          }
        </div>
      </div>
      <YouTubeStats
        user={UserStore.getUser()}
      />

    </>
  )
}));

export default Overview