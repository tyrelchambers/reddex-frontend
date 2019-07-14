import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import { inject, observer } from 'mobx-react';

const Navbar = inject("UserStore")(observer(({UserStore}) => {
  const [extended, setExtended] = useState(false);
  const extendedNav = extended ? "extended" : "";
  const [ redditProfile, setRedditProfile ] = useState({});

  const resetVisitorStatus = () =>{
    window.localStorage.setItem("new_visitor", null);
  }

  useEffect(() => {
    const profile = JSON.parse(window.localStorage.getItem("reddit_profile"));

    setRedditProfile({...profile});
  }, []);

  const Username = () => redditProfile.subreddit ? <h4 className="nav-username">{redditProfile.subreddit.display_name_prefixed}</h4> : null;
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
              <Link onClick={() => setExtended(false)} to="/" >Home</Link>
            </li>
            <li className="d-f ai-c nav-link">
              <Link onClick={() => setExtended(false)} to="/about" >What is Reddex?</Link>
            </li>

            <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
              <Link onClick={() => setExtended(false)} to="#" onClick={resetVisitorStatus}>Reset Visitor Status</Link>
            </li>
            {!UserStore.getUser() && 
              <React.Fragment>
                <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                  <Link onClick={() => setExtended(false)} to="/signup" >Sign Up</Link>
                </li>
                <li className="d-f ai-c nav-link">
                  <Link onClick={() => setExtended(false)} to="/login" >Login</Link>
                </li>
              </React.Fragment>
            }

            {UserStore.getUser() &&
              <React.Fragment>
                <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                  <Link onClick={() => setExtended(false)} to="/account/default_message">Account</Link>
                </li>
                <li className="d-f ai-c">
                  <Link onClick={() => setExtended(false)} to="/" onClick={() => {
                    UserStore.signOut()
                  }}>Sign Out</Link>
                </li>
              </React.Fragment>
            }
          </ul>
        </nav>

        <Username/>
      </div>
      
    </React.Fragment>
  );
}));

export default Navbar;