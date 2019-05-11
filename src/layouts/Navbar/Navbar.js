import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {

  const [extended, setExtended] = useState(false);
  const extendedNav = extended ? "extended" : "";
  
  return(
    <React.Fragment>
      <div className="nav-toggle pos-a" onClick={() => setExtended(!extended)}>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
        <span className="toggle-line"></span>
      </div>
      <nav className={"navbar " + extendedNav}>
        <ul>
          <li className="d-f ai-c">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="d-f ai-c">
            <Link to="/about" className="nav-link">What is Reddex?</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
}

export default Navbar;