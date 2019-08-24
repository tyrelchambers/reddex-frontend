import React from 'react'
import './Header.scss';
import Navbar from '../Navbar/Navbar';
import reddexLogo from '../../assets/reddex-logo.svg';
import {inject, observer } from 'mobx-react';

const Header = inject("UserStore")(observer(({UserStore}) => {
  return(
    <header className="header d-f jc-sb">
      <div className="brand">
        <img src={reddexLogo} alt="Reddex"/>
      </div>
      <Navbar 
        redditProfile={UserStore.getRedditProfile()}
      />
    </header>
  );
}));

export default Header;