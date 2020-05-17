import React from 'react';
import './Tabs.scss'
import { NavLink } from 'react-router-dom';

const Tabs = ({tabs}) => {
  const url = window.location.pathname + window.location.search;

  return (
    <ul className="d-f fxd-c tabs">
      {tabs.map(tab => (
        <li className="tab">
          <NavLink to={tab.url} activeClassName="tab-active" isActive={() => {
            if(url === tab.url) {
              return true
            }
          }}>
            {tab.text}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export default Tabs;
