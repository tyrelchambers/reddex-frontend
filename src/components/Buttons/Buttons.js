import React from 'react'
import './buttons.scss';

export const MainButton = ({...props}) => {
  
  if ( props.loading ) {
    return (
      <div className="ml- mr- d-f jc-c">
        <div className="loader"></div>
      </div>
    )
  } else {
    return (
      <button className={props.className} onClick={props.onClick} disabled={props.disabled}>
        {props.children}
        {props.value}
      </button>
    )
  }
}

