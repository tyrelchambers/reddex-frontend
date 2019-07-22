import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className="loading-wrapper d-f ai-c fxd-c animated fadeIn faster">
      <div className="loader mb+ mt+"></div>
      <h2 className="ta-c">Wrangling Reddit Posts... Hold Tight</h2>
      <h4 className="ta-c">This might take a few seconds</h4>

    </div>
  );
}

export default Loading;