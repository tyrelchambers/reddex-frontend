import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';

const Twitter = ({config, setConfig}) => {
  return (
    <div className="timeline twitter mt+">
      <h2>Twitter</h2>
      <p className="subtle mb-">Activate to show tweets from your profile</p>
      <ToggleStatus
        context="twitterTimeline"
        option="Activate"
        setToggledHandler={() => {
          setConfig({...config, twitterTimeline: !config.twitterTimeline});
        }}
        toggled={config.twitterTimeline ? true : false}
      />

      {config.twitterTimeline &&
        <div className="w-234px mt+">
          <h4>Enter your channel ID</h4>
          <input type="text" className="form-input w-100pr" placeholder="Twitter Account Name" value={config.twitterId} onChange={e => setConfig({...config, twitterId: e.target.value})}/>
        </div>
      }
    </div>
  );
}

export default Twitter;
