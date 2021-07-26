import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";
import { inject, observer } from "mobx-react";
import NavWidget from "../NavWidget/NavWidget";
import Preferences from "../Preferences/Preferences";

const Navbar = inject("UserStore")(
  observer(({ UserStore }) => {
    return (
      <React.Fragment>
        <div className="navbar-wrapper">
          <nav className="navbar">
            <ul>
              <li className="d-f ai-c nav-link patreon-button">
                <img
                  src={require("../../assets/Patreon_Mark_White.png")}
                  className="nav-patreon-icon"
                  alt="Patreon water mark"
                />
                <a
                  href="https://www.patreon.com/bePatron?u=683950"
                  data-patreon-widget-type="become-patron-button"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Become a Patron
                </a>
              </li>
              <li className="d-f ai-c nav-link ml+">
                <Link to="/">Home</Link>
              </li>

              <li className="d-f ai-c nav-link">
                <Link to="/about">About</Link>
              </li>

              <li className="d-f ai-c nav-link">
                <Link to="/help">Help</Link>
              </li>

              <li
                className="d-f ai-c nav-link desktop nav-dropdown p-"
                onClick={(e) => {
                  e.target.closest(".nav-dropdown").classList.toggle("extend");
                }}
              >
                <div className="d-f nav-dropdown-label">
                  <p>Options</p>
                  <i className="fas fa-ellipsis-h"></i>
                </div>

                <div className="nav-item-dropdown">
                  <Preferences />
                </div>
              </li>

              {!UserStore.getUser() && (
                <React.Fragment>
                  <li className="d-f ai-c nav-link ">
                    <Link to="/authorize">Sign Up</Link>
                  </li>
                  <li className="d-f ai-c nav-link">
                    <Link to="/login">Login</Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </nav>
          {UserStore.getUser() && <NavWidget />}
        </div>
      </React.Fragment>
    );
  })
);

export default Navbar;
