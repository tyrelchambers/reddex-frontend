import React from 'react';
import './NavWidget.scss'
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom'

const NavWidget = inject("UserStore")(observer(({UserStore}) => {
  const redditProfile = UserStore.getRedditProfile() ? UserStore.getRedditProfile() : null;

  if ( !redditProfile ) return null;

  const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");
  const resetVisitorStatus = () =>{
    window.localStorage.setItem("new_visitor", null);
  }
  return (
    <div className="topbar-account-widget">
      <div className="d-f ai-c">
        <img src={profileImg} className="profile-image small mr-" alt="Reddit User's profile"/>
        <h5 className='reddit-name'>{redditProfile.name}</h5>
        <i className="fas fa-chevron-down ml+ topbar-dropdown-toggle"></i>
      </div>
      
      <div className="dropdown-wrapper">
        <ul className="dashboard-dropdown d-f fxd-c">
          <li className="d-f ai-c ">
            <Link to="/dashboard/home"
              className="dropdown-link"
            >Dashboard</Link>
          </li>
          
          <li className="d-f ai-c ">
            <Link onClick={() => {
              resetVisitorStatus()
            }} 
            to="#"
            className="dropdown-link">Download Subreddits</Link>
          </li>

          <li>
            <Link to="/signout" className="dropdown-link" >Sign Out</Link>
          </li>
        </ul>
      </div>

    </div>
  );
}));

export default NavWidget;
