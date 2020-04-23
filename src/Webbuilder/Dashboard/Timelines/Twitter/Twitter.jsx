import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const Twitter = inject("SiteStore")(observer(({SiteStore}) => {
  return (
    <div className="timeline twitter mt+">
      <div className="d-f">
        <div className="mr--- mt-">
          <ToggleStatus
            context="twitter_timeline"
            option="Inactive"
            disabledText="Active"
            setToggledHandler={() => {
              SiteStore.setConfig({twitter_timeline: !SiteStore.config.twitter_timeline});
            }}
            toggled={SiteStore.config.twitter_timeline ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Twitter</h2>
          <p className="subtle mb-">Activate to show tweets from your profile</p>
        </div>
      </div>
      
      

      {SiteStore.config.twitter_timeline &&
        <div className="w-234px mt-">
          <h4>Enter your Twitter handle</h4>
          <input type="text" className="form-input w-100pr mt-" placeholder="Twitter handle" value={SiteStore.config.twitter_id} onChange={e => SiteStore.setConfig({twitter_id: e.target.value})}/>
        </div>
      }
    </div>
  );
}))

export default Twitter;
