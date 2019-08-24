import React from 'react'
import './Header.scss';
import Navbar from '../Navbar/Navbar';
import reddexLogo from '../../assets/reddex-logo.svg';
import {inject, observer } from 'mobx-react';

const Header = inject("UserStore")(observer(({UserStore}) => {
  return(
    <header className="header d-f jc-c">
      <div className="wrapper d-f jc-sb ai-c">
        <div className="brand">
          <img src={reddexLogo} alt="Reddex"/>
        </div>
        <Navbar 
          redditProfile={UserStore.getRedditProfile()}
        />
      </div>
    </header>
  );
}));

export default Header;