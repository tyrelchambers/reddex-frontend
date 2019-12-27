import React from 'react';
import ToggleStatus from '../../../../components/ToggleStatus/ToggleStatus';

const Youtube = ({config, setConfig, store}) => {
  return (
    <div className="timeline youtube">
      <h2>Youtube</h2>
      <p className="subtle mb-">Activate to show the last 5 videos on your website</p>
      <ToggleStatus
        context="youtubeTimeline"
        option="Activate"
        setToggledHandler={() => {
          setConfig({...config, youtubeTimeline: !config.youtubeTimeline});
        }}
        toggled={config.youtubeTimeline ? true : false}
      />

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
