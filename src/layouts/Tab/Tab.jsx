import React from 'react';
import './Tab.scss'
import { NavLink } from 'react-router-dom'

const Tab = ({params, url, paramValue, paramKey, text}) => {
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

export default Tab;
