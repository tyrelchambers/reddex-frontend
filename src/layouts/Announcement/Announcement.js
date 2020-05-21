import React from 'react'
import './Announcement.scss';
import announcements from './announcements'

const Announcement = () => {
  if(window.localStorage.getItem('announcement')) {
    window.localStorage.removeItem('announcement')
  };
  
  const {
    title,
    body
  } = announcements["patreon"]
  
  return (
    <div className="d-f jc-c w-100pr announcement">
      <div className="container d-f jc-sb ai-c">
        <div className="d-f announcement-content ai-c">
          <h4 className="announcement-title">{title}</h4>
          <p className="announcement-body" dangerouslySetInnerHTML={{__html: body}}></p>
        </div>
      </div>
    </div>
  )
}

export default Announcement
