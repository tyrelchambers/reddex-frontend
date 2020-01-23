import React from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';
import NavWidget from '../NavWidget/NavWidget';
import isEmpty from '../../helpers/objIsEmpty';

const Navbar = inject("UserStore")(observer(({UserStore, redditProfile}) => {
  const Username = () => {
    if ( !redditProfile ) {
      return null;
    }

    return (
      <NavWidget />
    )
  }
    
console.log(  isEmpty(redditProfile)
)
  return(
    <React.Fragment>      
      <div className="navbar-wrapper">
        <nav className="navbar">
          <ul>
            <li className="d-f ai-c nav-link">
              <Link to="/" >Home</Link>
            </li>

            <li className="d-f ai-c nav-link">
              <Link to="/about" >About</Link>
            </li>

            <li className="d-f ai-c nav-link">
              <Link to="/help" >Help</Link>
            </li>

            {/* <li className="d-f ai-c nav-link">
              <Link to="/pricing" >Pricing</Link>
            </li> */}

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