import React from "react";
import "./Tabs.css";
import { NavLink } from "react-router-dom";
import HR from "../../components/HR/HR";

const Tabs = ({ tabs, optionalTabs }) => {
  const url = window.location.pathname + window.location.search;

  return (
    <div className="flex flex-col tabs-wrapper mr-10">
      {tabs && (
        <ul className="flex flex-col tabs">
          {tabs.map((tab, id) => (
            <li className="tab" key={id}>
              <NavLink
                to={tab.url}
                activeClassName="tab-active"
                isActive={() => {
                  if (url === tab.url) {
                    return true;
                  }
                }}
              >
                {tab.text}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
      {optionalTabs && (
        <>
          <HR />
          <ul className="flex flex-col tabs">
            {optionalTabs.map((tab, id) => (
              <li className="tab" key={id}>
                {tab}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Tabs;
