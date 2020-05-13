import React from 'react'
import { Link } from 'react-router-dom';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import './Navbar.scss';
import NavWidget from '../NavWidget/NavWidget';
import Preferences from '../Preferences/Preferences';
import HR from '../../components/HR/HR'

const MobileNav = inject("UserStore")(observer(({redditProfile, UserStore, extended = "", setExtended}) => {

  return (
    <div className={`mobile-navbar-wrapper ${extended}`}>
        <nav className="mobile-navbar">
          <ul>
            <li className="d-f ai-c nav-link">
              <Link onClick={setExtended} to="/" >Home</Link>
            </li>
            
            <li className="d-f ai-c nav-link">
              <Link to="/patreon">Patrons</Link>
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

            <li className="d-f ai-c nav-link nav-dropdown p-" >
              <div className="d-f nav-dropdown-label" onClick={(e) => {
                e.target.closest('.nav-dropdown').classList.toggle('extend')
              }}>
                <p>Options</p>
                <i className="fas fa-ellipsis-h"></i>
              </div>

              <div className="nav-item-dropdown">
                <Preferences/>
              </div>
            </li>

            {(UserStore.getUser() && redditProfile) &&
              <NavWidget />
            }
           
            {!UserStore.getUser() && 
              <React.Fragment>
                <div className="mb-">
                <HR />
                </div>
                <li className="d-f ai-c nav-link ">
                  <Link onClick={setExtended} to="/authorize" >Sign Up</Link>
                </li>
                <li className="d-f ai-c nav-link">
                  <Link onClick={setExtended} to="/login" >Login</Link>
                </li>
              </React.Fragment>
            }

            <li className="d-f ai-c nav-link mr- patreon-button">
              <img src={require('../../assets/Patreon_Mark_White.png')} className="nav-patreon-icon" alt="Patreon water mark"/>
              <a href="https://www.patreon.com/bePatron?u=683950" data-patreon-widget-type="become-patron-button" target="_blank" rel="noopener noreferrer">Become a Patron</a>
            </li>
            <li className="d-f ai-c nav-main-btn">
              <Link onClick={setExtended} to="/" >Get Posts</Link>
            </li>

          </ul>
        </nav>

        
      </div>
  )
}))

export default MobileNav
