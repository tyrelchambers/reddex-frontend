import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';
import { toJS } from 'mobx';

const Navbar = inject("UserStore")(observer(({UserStore}) => {
  const [extended, setExtended] = useState(false);
  const [ user, setUser ] = useState(false);
  const extendedNav = extended ? "extended" : "";
  
  useEffect(() => {
    let user = UserStore.getUser();
    setUser(user ? true : false);
  }, [])

  const resetVisitorStatus = () =>{
    window.localStorage.setItem("new_visitor", null);
  }
  return(
    <React.Fragment>
      {console.log(user.length)}
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
          {!user && 
            <React.Fragment>
              <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                <Link to="/signup" >Sign Up</Link>
              </li>
              <li className="d-f ai-c nav-link">
                <Link to="/login" >Login</Link>
              </li>
            </React.Fragment>
          }

          {user &&
            <React.Fragment>
              <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                <Link to="/account">Account</Link>
              </li>
              <li className="d-f ai-c">
                <Link to="/" onClick={() => {
                  setUser(false);
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