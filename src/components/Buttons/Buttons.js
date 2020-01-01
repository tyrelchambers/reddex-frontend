import React from 'react'
import './buttons.scss';

export const MainButton = (props) => {
  if ( props.loading ) {
    return (
      <div className={`${props.className} d-f ai-c disabled`} onClick={props.onClick}>
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
    )
  } else {
    return (
      <button className={props.className} onClick={props.onClick} disabled={props.disabled} type={props.type}>
        {props.children}
        {props.value}
      </button>
    )
  }
}

export const MinimalButton = ({...props}) => (
  <button className={`minimal-btn ${props.classNames}`} onClick={props.onClick} >
    {props.children}
  </button>
)