import React, {useState, useCallback, useRef} from 'react';
import './ToggleStatus.scss'

const ToggleStatus = ({option, toggled, setToggledHandler}) => {

  if (!toggled) {
    return (
      <div className="toggle" onClick={setToggledHandler} name="theme" value={option.toLowerCase()}>
        <span className="toggle-status"></span>  
        <span className="toggle-option">{option}</span>
      </div> 
    );
  } else {
    return (
      <div className="toggle toggled" name="theme" value={option.toLowerCase()}>
        <span className="toggle-status">
          <i className="fas fa-check"></i>
        </span>  
        <span className="toggle-option">{option}</span>
      </div> 
    );
  }
}

export default ToggleStatus;
