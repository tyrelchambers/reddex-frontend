import React from 'react'
import DashboardDropdown from '../DashboardDropdown/DashboardDropdown';
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Navbar.scss';
const MobileNav = inject("UserStore")(observer(({redditProfile, UserStore, extended = "", setExtended}) => {
  const Username = () => {
    if ( !redditProfile ) {
      return null;
    }
    const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");

    return (
      <div className="d-f ai-c topbar-account-widget">
        <img src={profileImg} className="profile-image small mr-" alt="Reddit User's profile"/>
        <h5>{redditProfile.subreddit.title}</h5>
        <i className="fas fa-chevron-down ml+ topbar-dropdown-toggle"></i>
        <DashboardDropdown />
      </div>
    )
  }

  return (
    <div className={`mobile-navbar-wrapper ${extended}`}>
        <nav className="mobile-navbar">
          <ul>
            <li className="d-f ai-c nav-link">
              <Link onClick={setExtended} to="/" >Home</Link>
            </li>
            <li className="d-f ai-c nav-link">
              <Link onClick={setExtended} to="/about" >What is Reddex?</Link>
            </li>

            {UserStore.getUser() &&
              <Username/>
            }
           
            {!UserStore.getUser() && 
              <React.Fragment>
                <li className="d-f ai-c nav-link ">
                  <Link onClick={setExtended} to="/signup" >Sign Up</Link>
                </li>
                <li className="d-f ai-c nav-link">
                  <Link onClick={setExtended} to="/login" >Login</Link>
                </li>
              </React.Fragment>
            }

            <li className="d-f ai-c nav-main-btn">
              <Link onClick={setExtended} to="/" >Get Posts</Link>
            </li>

          </ul>
        </nav>

        
      </div>
  )
}))

export default MobileNav
