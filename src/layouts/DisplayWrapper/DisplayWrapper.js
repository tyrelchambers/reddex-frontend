import React from 'react'
import Header from '../Header/Header';

const DisplayWrapper = (props) => {
  if ( props.hasHeader ) {
    return (
      <div className={props.className}>
        <Header />
        {props.children}
      </div>
    )
  } else {
    return (
      <div className={props.className}>
        {props.children}
      </div>
    )
  }
}

export default DisplayWrapper
