import React from 'react';
import { NavLink } from 'react-router-dom'
import './Tabs.scss'

const Tabs = ({url, paramValue, paramKey, text}) => {
  const params = new URLSearchParams(window.location.search);

  return (
    <div className="tabs-item">
      <NavLink to={`${url}?${paramKey}=${paramValue}`} activeClassName="tab-item-active" isActive={() => {
        if (params.get(paramKey) === paramValue) {
          return true;
        }
      }}>{text}</NavLink>
    </div>
  );
}

export default Tabs;
