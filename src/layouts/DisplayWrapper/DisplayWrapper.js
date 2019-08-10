import React from 'react'
import Header from '../Header/Header';

const DisplayWrapper = (props) => {
  if ( props.hasHeader ) {
    return (
      <React.Fragment>
        <Header />
        {props.children}
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        {props.children}
      </React.Fragment>
    )
  }
}

export default DisplayWrapper
