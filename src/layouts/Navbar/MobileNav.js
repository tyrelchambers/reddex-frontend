import React from 'react'
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Navbar.scss';
import NavWidget from '../NavWidget/NavWidget';
const MobileNav = inject("UserStore")(observer(({redditProfile, UserStore, extended = "", setExtended}) => {
  const Username = () => {
    if ( !redditProfile ) {
      return null;
    }

    return (
      <NavWidget />
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
              <Link to="/about" >About</Link>
            </li>
           
            <li className="d-f ai-c nav-link">
              <Link to="/help" >Help</Link>
            </li>

            <li className="d-f ai-c nav-link">
              <Link to="/explore" >Explore</Link>
            </li>

            {UserStore.getUser() &&
              <Username/>
            }
           
            {!UserStore.getUser() && 
              <React.Fragment>
                <li className="d-f ai-c nav-link ">
                  <Link onClick={setExtended} to="/authorize" >Sign Up</Link>
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
