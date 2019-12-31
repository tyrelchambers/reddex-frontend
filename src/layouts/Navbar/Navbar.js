import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';
import DashboardDropdown from '../DashboardDropdown/DashboardDropdown';
import { useAuth0 } from '../../react-auth0-spa';

const Navbar = inject("UserStore")(observer(({UserStore, redditProfile}) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

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
      <div className="navbar-wrapper">
        <nav className="navbar">
          <ul>
            <li className="d-f ai-c nav-link">
              <Link to="/" >Home</Link>
            </li>

            <li className="d-f ai-c nav-main-btn">
              <Link to="/" >Get Posts</Link>
            </li>

            {!isAuthenticated && 
              <React.Fragment>
                <li className="d-f ai-c nav-link ">
                  <Link to="/signup" >Sign Up</Link>
                </li>
                <li className="d-f ai-c nav-link">
                  <a href="#" onClick={() => loginWithRedirect()}>Login</a>
                </li>
              </React.Fragment>
            }
          </ul>
        </nav>

        {isAuthenticated &&
          <Username/>
        }
      </div>
      
    </React.Fragment>
  );
}));

export default Navbar;