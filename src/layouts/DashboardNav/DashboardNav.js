import React from 'react'
import './DashboardNav.scss';
import {NavLink, Link} from 'react-router-dom';
import brandImg from '../../assets/reddex-logo.svg';

const DashboardNav = () => {
  return (
    <nav className="dash-nav ">
      <Brand
        img={brandImg}
      />
      <ul >
        <li>
          <NavLink to="/dashboard/home" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-home"></i>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/reading_list" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-file-alt"></i>
            Stories
          </NavLink>
        </li>
        <li>
          <NavLink to="/dashboard/inbox" className="dash-nav-item" activeClassName="dash-nav-item-active ">
            <i className="fas fa-inbox"></i>
            Inbox
          </NavLink>
        </li>
        <li>
          <Link to="/" className="dash-nav-item">
            <i className="fas fa-download"></i>
            Get Stories
          </Link>
        </li>
      </ul>
    </nav>
  )
}

const Brand = ({img}) => {
  return (
    <div className="d-f ai-c jc-c mt-">
      <img src={img} alt="Brand" style={{width: "130px"}}/>
    </div>
  );
}

export default DashboardNav
