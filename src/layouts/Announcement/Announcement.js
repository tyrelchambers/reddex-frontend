import React from 'react'
import './Announcement.scss';

const Announcement = ({title, body}) => {
  const ann = window.localStorage.getItem('announcement');

  if ( ann === "false" ) {
    return null;
  }
  
  return (
    <div className="d-f jc-c w-100pr announcement">
      <div className="wrapper d-f jc-sb ai-c">
        <div className="d-f">
          <h4 className="announcement-title">{title}</h4>
          <p className="announcement-body">{body}</p>
        </div>

        <i className="fas fa-times announcement-close"
          onClick={closeAnnouncement}
        ></i>
      </div>
    </div>
  )
}

const closeAnnouncement = () => {
  const ann = document.querySelector(".announcement");
  ann.style.display = "none";
  return window.localStorage.setItem("announcement", false)
}
export default Announcement
