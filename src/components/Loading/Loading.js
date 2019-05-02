import React from 'react';
import './Loading.scss';

const Loading = (params) => {
  return (
    <div className="loading-wrapper d-f fxd-c">
      <h2 className="ta-c">Wrangling Reddit Posts... Hold Tight</h2>
      <h4 className="ta-c">This might take a few seconds</h4>
      <div id="preloader">
        <div id="loader"></div>
      </div>
    </div>
  );
}

export default Loading;