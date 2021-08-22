import React from "react";
import "./StatusUI.css";

const StatusUI = ({ status }) => {
  if (!status.message) return null;
  return (
    <div className="status-wrapper shadow-lg">
      <div className={`justify-center flex items-center mr-2`}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      {status.message}
    </div>
  );
};

export default StatusUI;
