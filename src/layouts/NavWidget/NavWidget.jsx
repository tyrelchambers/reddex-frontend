import React from 'react';
import DashboardDropdown from '../DashboardDropdown/DashboardDropdown';
import './NavWidget.scss'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
const NavWidget = inject("UserStore")(observer(({UserStore}) => {
  const redditProfile = UserStore.getRedditProfile() ? UserStore.getRedditProfile() : null;

  if ( !redditProfile ) return null;

  const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");

  return (
    <div className="topbar-account-widget">
      <div className="d-f ai-c">
        <img src={profileImg} className="profile-image small mr-" alt="Reddit User's profile"/>
        <h5 className='reddit-name'>{redditProfile.name}</h5>
        <i className="fas fa-chevron-down ml+ topbar-dropdown-toggle"></i>
      </div>
      <DashboardDropdown />
    </div>
  );
}));

export default NavWidget;
