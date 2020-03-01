import React from 'react'
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Navbar.scss';
import NavWidget from '../NavWidget/NavWidget';
import Preferences from '../Preferences/Preferences';
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

            <li className="d-f ai-c nav-link nav-dropdown p-">
              <div className="d-f nav-dropdown-label">
                <p>Options</p>
                <i className="fas fa-ellipsis-h"></i>
              </div>

              <div className="nav-item-dropdown">
                <Preferences/>
                <div>
                  TEDT
                </div>
                <div>
                  TEDT
                </div><div>
                  TEDT
                </div><div>
                  TEDT
                </div>
                <div>
                  TEDT
                </div>
                <div>
                  TEDT
                </div><div>
                  TEDT
                </div><div>
                  TEDT
                </div><div>
                  TEDT
                </div>
                <div>
                  TEDT
                </div><div>
                  TEDT
                </div><div>
                  TEDT
                </div>
              </div>
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
