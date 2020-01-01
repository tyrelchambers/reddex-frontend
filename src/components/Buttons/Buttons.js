import React from 'react'
import './buttons.scss';

export const MainButton = (props) => {
  if ( props.loading ) {
    return (
      <div className="loader"></div>
    )
  } else {
    console.log(props.loading)
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