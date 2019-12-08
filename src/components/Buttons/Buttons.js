import React from 'react'
import './buttons.scss';

export const MainButton = ({...props}) => {
  if ( props.loading ) {
    return (
      <div className="m- d-f jc-c">
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

export const MinimalButton = ({...props}) => (
  <button className="minimal-btn" onClick={props.onClick} >
    {props.children}
  </button>
)