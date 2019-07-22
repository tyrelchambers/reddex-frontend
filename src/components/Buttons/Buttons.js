import React, {useState} from 'react'
import './buttons.scss';

export const MainButton = ({...props}) => {
  
  if ( props.loading ) {
    return (
      <div className="ml- mr-">
        <div className="loader"></div>
      </div>
    )
  } else {
    return (
      <button className={props.className} onClick={props.onClick}>
        {props.children}
        {props.value}
      </button>
    )
  }
}

