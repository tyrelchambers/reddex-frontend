import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import firebase from 'firebase';

const Navbar = () => {

  const [extended, setExtended] = useState(false);
  const extendedNav = extended ? "extended" : "";
  const [ user, setUser ] = useState({});

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
          setUser(user);
      } else {
         setUser(false);         
      }
  });
  }, []);

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
          {!user && 
            <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
              <Link to="/signup" >Sign Up</Link>
            </li>
          }

          {user !== false &&
            <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
              <Link to="/signout" onClick={signoutHandler}>Sign Out</Link>
            </li>
          }
        </ul>
      </nav>
    </React.Fragment>
  );
}

const signoutHandler = () => {
  firebase.auth().signOut().then(function() {
    console.log("Signed out");
    window.location.pathname = "/";
  }).catch(function(error) {
    console.log(error);
  });
}

export default Navbar;