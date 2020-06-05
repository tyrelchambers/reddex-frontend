import React from 'react';
import './StatusUI.scss'

const StatusUI = ({status}) => {

  if (!status) return null;

  return (
    <div className="status-wrapper shadow-lg">
      <div className={`jc-c d-f ai-c mr-`} >
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      {status}
    </div>
  );
}

export default StatusUI;
