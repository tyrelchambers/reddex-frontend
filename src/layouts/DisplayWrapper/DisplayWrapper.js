import React from 'react'
import Header from '../Header/Header';
import Announcement from '../Announcement/Announcement';

const DisplayWrapper = (props) => {
  if ( props.hasHeader === true ) {
    return (
      <div>
        <Header />
        <Announcement 
          title={props.announcementTitle}
          body={props.announcementBody}
        />
        <div className={props.className}>        
          {props.children}
        </div>
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
