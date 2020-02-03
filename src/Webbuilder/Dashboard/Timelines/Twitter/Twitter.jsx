import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';

const Twitter = ({config, setConfig}) => {
  return (
    <div className="timeline twitter mt+">
      <div className="d-f">
        <div className="mr--- mt-">
          <ToggleStatus
            context="twitter_timeline"
            option="Inactive"
            disabledText="Active"
            setToggledHandler={() => {
              setConfig({...config, twitter_timeline: !config.twitter_timeline});
            }}
            toggled={config.twitter_timeline ? true : false}
          />
        </div>
        <div className="d-f fxd-c">
          <h2>Twitter</h2>
          <p className="subtle mb-">Activate to show tweets from your profile</p>
        </div>
      </div>
      
      

      {config.twitter_timeline &&
        <div className="w-234px mt+">
          <h4>Enter your channel ID</h4>
          <input type="text" className="form-input w-100pr" placeholder="Twitter Account Name" value={config.twitter_id} onChange={e => setConfig({...config, twitter_id: e.target.value})}/>
        </div>
      }
    </div>
  );
}

export default Twitter;
