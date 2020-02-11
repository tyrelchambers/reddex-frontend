import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

const Youtube = inject("SiteStore")(observer(({SiteStore}) => {
  return (
    <div className="timeline youtube">
      <div className="d-f ">
        <div className="mt--- mr-">
          <ToggleStatus
            context="youtube_timeline"
            option="Inactive"
            disabledText="Active"
            setToggledHandler={() => {
              SiteStore.setConfig({youtube_timeline: !SiteStore.config.youtube_timeline});
            }}
            toggled={SiteStore.config.youtube_timeline ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Youtube</h2>
          <p className="subtle mb-">Activate to show the last 5 videos on your website</p>
        </div>
      </div>
      
      

      {SiteStore.config.youtube_timeline &&
        <div className="w-234px mt+">
          <h4>Enter your channel ID</h4>
          <input type="text" className="form-input w-100pr" placeholder="Channel ID" value={SiteStore.config.youtube_id} onChange={e => SiteStore.setConfig({youtube_id: e.target.value})}/>
        </div>
      }
    </div>
  );
}));

export default Youtube;
