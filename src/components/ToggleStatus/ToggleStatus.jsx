import React from 'react';
import './ToggleStatus.scss'

const ToggleStatus = ({option, toggled, setToggledHandler, context, disabledText}) => {

  if (!toggled) {
    return (
      <div className="toggle" onClick={setToggledHandler} name={context} value={option.toLowerCase()}>
        <span className="toggle-status"></span>  
        <span className="toggle-option">{option}</span>
      </div> 
    );
  } else {
    return (
      <div className="toggle toggled" name={context} value={option.toLowerCase()} onClick={setToggledHandler}>
        <span className="toggle-status">
          <i className="fas fa-check"></i>
        </span>  
        <span className="toggle-option">{disabledText ? disabledText : option}</span>
      </div> 
    );
  }
}

export default ToggleStatus;
