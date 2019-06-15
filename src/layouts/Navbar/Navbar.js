import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';
import UserStore from '../../stores/UserStore';
import { observer } from 'mobx-react-lite';

const Navbar = observer(() => {

  const [extended, setExtended] = useState(false);
  const [ user, setUser ] = useState({});
  const extendedNav = extended ? "extended" : "";
  const userStore = useContext(UserStore);
  
  useEffect(() => {
    let user = userStore.getUser();
    setUser(user);
  }, [])

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
          {user === null && 
            <React.Fragment>
              <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                <Link to="/signup" >Sign Up</Link>
              </li>
              <li className="d-f ai-c nav-link">
                <Link to="/login" >Login</Link>
              </li>
            </React.Fragment>
          }

          {user !== null &&
            <React.Fragment>
              <li className="d-f ai-c nav-link bdts-s bdtw-1 ">
                <Link to="/account">Account</Link>
              </li>
              <li className="d-f ai-c">
                <Link to="/signout" onClick={() => userStore.signOut()}>Sign Out</Link>
              </li>
            </React.Fragment>
          }
        </ul>
      </nav>
    </React.Fragment>
  );
});

export default Navbar;