import React from 'react'
import './DashboardTopbar.scss';
import DashboardDropdown from '../DashboardDropdown/DashboardDropdown';

const DashboardTopbar = () => {
  const redditProfile = JSON.parse(window.localStorage.getItem('reddit_profile'));
  const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");
  return (
    <div className="d-f dashboard-topbar jc-sb">
      <NavToggle />

      <div className="d-f ai-c topbar-account-widget">
        <img src={profileImg} className="profile-image small mr-" alt="Reddit User's profile"/>
        <h5>{redditProfile.subreddit.title}</h5>
        <i className="fas fa-chevron-down ml+ topbar-dropdown-toggle"></i>
        <DashboardDropdown />
      </div>
    </div>
  )
}


 const NavToggle = () => {
  return (
    <div className=" dash-nav-toggle" onClick={(e) => {
      document.querySelector("#dashNav").classList.toggle('collapsed');
      const bodyWidth = document.body.clientWidth;

      if ( bodyWidth <= 425 ) {
        document.querySelector(".topbar-account-widget").classList.toggle('collapsed');
      }
    }}>
    <span className="toggle-line"></span>
    <span className="toggle-line"></span>
    <span className="toggle-line"></span>
  </div>
  );
}

export default DashboardTopbar