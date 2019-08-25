import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';
import DashboardDropdown from '../DashboardDropdown/DashboardDropdown';

const Navbar = inject("UserStore")(observer(({UserStore, redditProfile}) => {
  const [extended, setExtended] = useState(false);
  const extendedNav = extended ? "extended" : "";
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
    

  return(
    <React.Fragment>
      <div className="nav-toggle pos-a" onClick={() => setExtended(!extended)}>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </div>
      
      <div className={"navbar-wrapper " + extendedNav}>
        <nav className="navbar">
          <ul>
            <li className="d-f ai-c nav-link">
              <Link to="/" >Home</Link>
            </li>
            <li className="d-f ai-c nav-link">
              <Link to="/about" >What is Reddex?</Link>
            </li>

            <li className="d-f ai-c nav-main-btn">
              <Link to="/" >Get Posts</Link>
            </li>

            {!UserStore.getUser() && 
              <React.Fragment>
                <li className="d-f ai-c nav-link ">
                  <Link to="/signup" >Sign Up</Link>
                </li>
                <li className="d-f ai-c nav-link">
                  <Link to="/login" >Login</Link>
                </li>
              </React.Fragment>
            }
          </ul>
        </nav>

        {UserStore.getUser() &&
          <Username/>
        }
      </div>
      
    </React.Fragment>
  );
}));

export default Navbar;