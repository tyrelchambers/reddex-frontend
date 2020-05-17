import React from 'react';
import './WithNav.scss'
import { NavLink } from 'react-router-dom';

const WithNav = ({tabs}) => {
  return (
    <div className="w-100pr d-f">
      <ul className="d-f fxd-c tabs">
        {tabs.map(tab => (
          <li className="tab">
            <NavLink to={`/dashboard${tab.url}`}>
              {tab.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WithNav;
