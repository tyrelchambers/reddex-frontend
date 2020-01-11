import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';

const Youtube = ({config, setConfig}) => {
  return (
    <div className="timeline youtube">
      <div className="d-f ">
        <div className="mt--- mr-">
          <ToggleStatus
            context="youtubeTimeline"
            option="Inactive"
            disabledText="Active"
            setToggledHandler={() => {
              setConfig({...config, youtubeTimeline: !config.youtubeTimeline});
            }}
            toggled={config.youtubeTimeline ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Youtube</h2>
          <p className="subtle mb-">Activate to show the last 5 videos on your website</p>
        </div>
      </div>
      
      

      {config.youtubeTimeline &&
        <div className="w-234px mt+">
          <h4>Enter your channel ID</h4>
          <input type="text" className="form-input w-100pr" placeholder="Channel ID" value={config.youtubeId} onChange={e => setConfig({...config, youtubeId: e.target.value})}/>
        </div>
      }
    </div>
  );
}

export default Youtube;
