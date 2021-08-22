import React from "react";
import "./NavWidget.css";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

const NavWidget = inject("UserStore")(
  observer(({ UserStore }) => {
    const redditProfile = UserStore.getRedditProfile()
      ? UserStore.getRedditProfile()
      : null;

    if (!redditProfile) return null;

    const profileImg = redditProfile.icon_img.replace(/amp;/gi, "");

    return (
      <div className="topbar-account-widget">
        <div
          className="flex items-center"
          onClick={(e) => {
            e.target
              .closest(".topbar-account-widget")
              .classList.toggle("extend");
          }}
        >
          <img
            src={profileImg}
            className="profile-image small mr-2"
            alt="Reddit User's profile"
          />
          <h5 className="reddit-name flex-1">{redditProfile.name}</h5>
          <i className="fas fa-chevron-down ml-2 topbar-dropdown-toggle"></i>
        </div>

        <div className="dropdown-wrapper">
          <ul className="dashboard-dropdown flex flex-col">
            <li>
              <Link
                to="/dashboard/reading_list?t=approved"
                className="dropdown-link"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link to="/signout" className="dropdown-link">
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  })
);

export default NavWidget;
