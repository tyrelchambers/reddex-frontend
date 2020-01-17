import React from 'react';
import DashboardDropdown from '../DashboardDropdown/DashboardDropdown';
import './NavWidget.scss'
const NavWidget = () => {
  const redditProfile = JSON.parse(window.localStorage.getItem('reddit_profile'));
  const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");

  if (profileImg && redditProfile) {
    return (
      <div className="d-f ai-c topbar-account-widget">
        <img src={profileImg} className="profile-image small mr-" alt="Reddit User's profile"/>
        <h5>{redditProfile.name}</h5>
        <i className="fas fa-chevron-down ml+ topbar-dropdown-toggle"></i>
        <DashboardDropdown />
      </div>
    );
  } else {
    return null;
  }
}

export default NavWidget;
