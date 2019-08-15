import React from 'react';
import './Loading.scss';

const Loading = ({title, subtitle}) => {
  return (
    <div className="loading-wrapper d-f ai-c fxd-c animated fadeIn faster">
      <div className="loader mb+ mt+"></div>
      <h2 className="ta-c">{title}</h2>
      <h4 className="ta-c">{subtitle}</h4>

    </div>
  );
}

export default Loading;