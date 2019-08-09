import React from 'react'
import './DashboardTopbar.scss';

const DashboardTopbar = () => {
  const redditProfile = JSON.parse(window.localStorage.getItem('reddit_profile'));
  const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");
  return (
    <div className="d-f dashboard-topbar">
      <div className="d-f ai-c">
        <img src={profileImg} className="profile-image small mr-" alt="Reddit User's profile"/>
        <h5>{redditProfile.subreddit.title}</h5>
      </div>
    </div>
  )
}

export default DashboardTopbar
