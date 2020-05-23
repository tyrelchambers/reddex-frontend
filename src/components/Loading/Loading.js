import React from 'react';
import './Loading.scss';

const Loading = ({title, subtitle}) => {
  return (
    <div className="loading-wrapper d-f ai-c fxd-c animated fadeIn faster">
      <div className="loader mb+ mt+"></div>
      <p className="ta-c text-3xl font-bold">{title}</p>
      <p className="ta-c text-xl">{subtitle}</p>

    </div>
  );
}

export default Loading;