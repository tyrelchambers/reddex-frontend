import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';

const Navbar = inject("UserStore")(observer(({UserStore}) => {
  const [extended, setExtended] = useState(false);
  const extendedNav = extended ? "extended" : "";
  

  const resetVisitorStatus = () =>{
    window.localStorage.setItem("new_visitor", null);
  }
  return(
    <React.Fragment>
      <div className="nav-toggle pos-a" onClick={() => setExtended(!extended)}>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </div>
      <nav className={"navbar " + extendedNav}>
        <ul>
          <li className="d-f ai-c nav-link">
            <Link to="/" >Home</Link>
          </li>
          <li className="d-f ai-c nav-link">
            <Link to="/about" >What is Reddex?</Link>
          </li>

          <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
            <Link to="#" onClick={resetVisitorStatus}>Reset Visitor Status</Link>
          </li>
          {!UserStore.getUser() && 
            <React.Fragment>
              <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                <Link to="/signup" >Sign Up</Link>
              </li>
              <li className="d-f ai-c nav-link">
                <Link to="/login" >Login</Link>
              </li>
            </React.Fragment>
          }

          {UserStore.getUser() &&
            <React.Fragment>
              <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                <Link to="/account">Account</Link>
              </li>
              <li className="d-f ai-c">
                <Link to="/" onClick={() => {
                  UserStore.signOut()
                }}>Sign Out</Link>
              </li>
            </React.Fragment>
          }
        </ul>
      </nav>
    </React.Fragment>
  );
}));

export default Navbar;