import React from 'react'
import './Announcement.scss';

const Announcement = () => {
  const ann = window.localStorage.getItem('announcement');

  if ( ann === "false" ) {
    return null;
  }

  const title = "Getting Started"
  const body = "Enter the subreddit you want to search, in the subreddit field. Then click 'Get Posts'"
  
  return (
    <div className="d-f jc-c w-100pr announcement">
      <div className="wrapper d-f jc-sb ai-c">
        <div className="d-f announcement-content ai-c">
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
