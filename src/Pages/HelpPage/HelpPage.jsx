import React from 'react';
import './HelpPage.scss'
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper'

const HelpPage = () => {
  return (
    <DisplayWrapper hasHeader={true}>
      <div className="container d-f fxd-c center mt+ mb+">
        <h1 className="title ta-c">Help</h1>
        <p className="ta-c">Need some help using Reddex? Check out the topics below.</p>
        <div className="d-f fxd-c mt+">
          <div className="d-f help-item ai-c">
            <i className="fas fa-life-ring mr-"></i>
            <p>Visit the Help section: <a target="_blank" rel="noreferrer noopener" href="https://www.notion.so/reddex/Reddex-Help-Center-073a7bf5039c40769cc627bf8f38e1e7">help topics</a></p>
          </div>

          <div className="d-f help-item ai-c">
            <i className="fas fa-glass-cheers mr-"></i>
            <p>Want to see what's new? <a target="_blank" rel="noreferrer noopener" href="https://headwayapp.co/reddex-changelog">Reddex changelog</a></p>
          </div>
        </div>
      </div>
    </DisplayWrapper>
  );
}

export default HelpPage;
