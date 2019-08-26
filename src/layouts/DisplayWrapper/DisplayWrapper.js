import React from 'react'
import Header from '../Header/Header';
import Announcement from '../Announcement/Announcement';

const DisplayWrapper = (props) => {
  return (
    <div className="pt-large">
      {props.hasHeader && 
        <Header />
      }
      <Announcement 
        title={props.announcementTitle}
        body={props.announcementBody}
      />
      <div className={props.className}>        
        {props.children}
      </div>
    </div>
  )
}


export default DisplayWrapper
