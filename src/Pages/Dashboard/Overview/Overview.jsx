import React, {useEffect, useState} from 'react'
import YouTubeStats from '../../../components/YouTubeStats/YouTubeStats';
import { inject, observer } from 'mobx-react';
import './Overview.scss';
import Dashboard from '../Dashboard';
import OverviewOptions from '../../../layouts/OverviewOptions/OverviewOptions';

const Overview = inject("UserStore", "OverviewStore")(observer(({UserStore, OverviewStore}) => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const u = UserStore.getUser()
    setProfile(u)
  }, []);

  if ( !profile ) return null;

  return (
    <Dashboard>
      <OverviewOptions/>
      {/* <div className="quick-actions">
        <h3 className="mb-">Quick Actions</h3>
        
        <div className="quick-actions-body">
          {profile.website &&
            <a href={`https://${profile.website.subdomain}.reddex.app`} rel="noopener noreferrer" target="_blank" className="td-n link action"><i className="fas fa-external-link-square-alt mr---"></i> View your site</a>
          }
        </div>
      </div> */}
      {OverviewStore.youtube.enabled &&
        <YouTubeStats
          user={UserStore.getUser()}
        />
      }

         
    </Dashboard>
  )
}));

export default Overview
