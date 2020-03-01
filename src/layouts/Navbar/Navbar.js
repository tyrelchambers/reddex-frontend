import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';
import NavWidget from '../NavWidget/NavWidget';
import Preferences from '../Preferences/Preferences';

const Navbar = inject("UserStore")(observer(({UserStore}) => {
  return(
    <React.Fragment>      
      <div className="navbar-wrapper">
        <nav className="navbar">
          <ul>
            <li className="d-f ai-c nav-link">
              <Link to="/" >Home</Link>
            </li>

            <li className="d-f ai-c nav-link">
              <Link to="/explore" >Explore</Link>
            </li>

            <li className="d-f ai-c nav-link">
              <Link to="/about" >About</Link>
            </li>

            <li className="d-f ai-c nav-link">
              <Link to="/help" >Help</Link>
            </li>

            <li className="d-f ai-c nav-link nav-dropdown p-">
              <i class="fas fa-ellipsis-h"></i>

              <div className="nav-item-dropdown">
                <Preferences/>
              </div>
            </li>

            {/* <li className="d-f ai-c nav-link">
              <Link to="/pricing" >Pricing</Link>
            </li> */}

            {!UserStore.getUser() && 
              <React.Fragment>
                <li className="d-f ai-c nav-link ">
                  <Link to="/authorize" >Sign Up</Link>
                </li>
                <li className="d-f ai-c nav-link">
                  <Link to="/login" >Login</Link>
                </li>
              </React.Fragment>
            }
          </ul>
        </nav>
        {UserStore.getUser() &&
          <NavWidget />
        }
      </div>
      
    </React.Fragment>
  );
}));

export default Navbar;