import React from 'react'
import './Header.scss';
import Navbar from '../Navbar/Navbar';

const Header = (props) => {
  return(
    <header className="header">
      <Navbar />
    </header>
  );
}

export default Header;