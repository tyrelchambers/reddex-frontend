import React, {useEffect, useState} from 'react'
import YouTubeStats from '../../../components/YouTubeStats/YouTubeStats';
import HR from '../../../components/HR/HR';
import { inject, observer } from 'mobx-react';
import './Overview.scss';
import DashModuleSelect from '../../../components/DashModuleSelect/DashModuleSelect';
import ModuleSelectors from '../../../components/ModuleSelectors/ModuleSelectors';
import modules from './modules'
const Overview = inject("UserStore")(observer(({UserStore}) => {
  const [profile, setProfile] = useState();
  const [ toggled, setToggled ] = useState(true);
  const [ selectedMod, setSelectedMod ] = useState({
    youtubeStats: true
  });

  useEffect(() => {
    const u = UserStore.getUser()
    setProfile(u)
  }, []);

  if ( !profile ) return null;

  const modHandler = (mod) => {
    setSelectedMod({...selectedMod, ...mod})
  }

  return (
    <>
      <div className="quick-actions">
        <h3 className="mb-">Quick Actions</h3>
        
        <div className="d-f ai-c">
          <div className="quick-actions-body fx-1">
            {profile.website.subdomain &&
              <a href={`https://${profile.website.subdomain}.reddex.app`} rel="noopener noreferrer" target="_blank" className="td-n link action"><i className="fas fa-external-link-square-alt mr---"></i> View your site</a>
            }
          </div>
          <DashModuleSelect
            toggled={toggled}
            setToggled={setToggled}
          />
        </div>
        {toggled &&
          <ModuleSelectors
          setSelectedMod={(v) => modHandler(v)}
          selectedMod={selectedMod}
        />
        }
      </div>
      
      <div className="grid">
        {selectedMod.youtubeStats &&
          <div className="module youtube grid-item" >
            <h2>Youtube Stats</h2>
            <YouTubeStats user={UserStore.getUser()} />
          </div>
        }
      </div>

    </>
  )
}));

export default Overview
