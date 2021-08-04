import React from "react";
import { Link, NavLink } from "react-router-dom";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import "./Navbar.scss";
import Preferences from "../Preferences/Preferences";
import HR from "../../components/HR/HR";

const MobileNav = inject("UserStore")(
  observer(({ redditProfile, UserStore, extended = "", setExtended }) => {
    return (
      <div className={`mobile-navbar-wrapper ${extended}`}>
        <nav className="mobile-navbar">
          <ul>
            <li className="flex items-center nav-link">
              <Link onClick={setExtended} to="/">
                Home
              </Link>
            </li>

            <li className="flex items-center nav-link">
              <Link to="/about">About</Link>
            </li>

            <li className="flex items-center nav-link">
              <Link to="/help">Help</Link>
            </li>
          </ul>

          <ul>
            <li className="flex items-center nav-link nav-dropdown p-2 has-divider">
              <Preferences />
            </li>
          </ul>
          <ul>
            {UserStore.getUser() && redditProfile && (
              <>
                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/reading_list?t=approved">
                    Reading List
                  </NavLink>
                </li>

                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/submitted">Submitted</NavLink>
                </li>

                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/tags">Tag Manager</NavLink>
                </li>

                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/contacts">Contacts</NavLink>
                </li>

                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/inbox">Inbox</NavLink>
                </li>

                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/account?t=security">Account</NavLink>
                </li>

                <li className="flex items-center nav-link">
                  <NavLink to="/dashboard/site/general">Site Builder</NavLink>
                </li>

                <li className="flex items-center  nav-link has-divider">
                  <Link to="/signout">Sign Out</Link>
                </li>
              </>
            )}
          </ul>

          <ul>
            {!UserStore.getUser() && (
              <React.Fragment>
                <div className="mb-2">
                  <HR />
                </div>
                <li className="flex items-center nav-link ">
                  <Link onClick={setExtended} to="/authorize">
                    Sign Up
                  </Link>
                </li>
                <li className="flex items-center nav-link">
                  <Link onClick={setExtended} to="/login">
                    Login
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>

          <ul>
            <li className="flex items-center nav-link mr-2 mt-2 patreon-button">
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
            <li className="flex items-center nav-link">
              <Link onClick={setExtended} to="/">
                Get Posts
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  })
);

export default MobileNav;
