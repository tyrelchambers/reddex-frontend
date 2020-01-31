import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';

const Youtube = ({config, setConfig}) => {
  return (
    <div className="timeline youtube">
      <div className="d-f ">
        <div className="mt--- mr-">
          <ToggleStatus
            context="youtube_timeline"
            option="Inactive"
            disabledText="Active"
            setToggledHandler={() => {
              setConfig({...config, youtube_timeline: !config.youtube_timeline});
            }}
            toggled={config.youtube_timeline ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Youtube</h2>
          <p className="subtle mb-">Activate to show the last 5 videos on your website</p>
        </div>
      </div>
      
      

      {config.youtube_timeline &&
        <div className="w-234px mt+">
          <h4>Enter your channel ID</h4>
          <input type="text" className="form-input w-100pr" placeholder="Channel ID" value={config.youtube_id} onChange={e => setConfig({...config, youtube_id: e.target.value})}/>
        </div>
      }
    </div>
  );
}

export default Youtube;
