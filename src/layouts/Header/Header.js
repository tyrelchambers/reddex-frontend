import React, {useState, useEffect} from 'react'
import './Header.scss';
import Navbar from '../Navbar/Navbar';
import reddexLogo from '../../assets/watermark-green.svg';
import {inject, observer } from 'mobx-react';
import MobileNav from '../Navbar/MobileNav';
import headwayConfig from '../../helpers/headwayConfig';

const Header = inject("UserStore")(observer(({UserStore}) => {
  const [extended, setExtended] = useState(false);
  const [ profile, setProfile ] = useState();
  const [ loading, setLoading ] = useState(true);
  const extendedNav = extended ? "extended" : "";

  useEffect(() => {  
    const fn = async () => {
      const profile = await UserStore.getRedditProfile();
      setProfile({...profile});
      setLoading(false);
    }

    fn();
  }, [])

  useEffect(() => {
    if ( window.Headway) {
      headwayConfig()
    }
  })

  if ( loading ) return null;
  
  return(
    <header className="header d-f jc-c">

      <div className="container d-f jc-sb ai-c">
        <div className="brand d-f">
          <img src={reddexLogo} alt="Reddex"/>
          <div id="headway"></div>
        </div>
        <Navbar 
          redditProfile={profile}
          />
        <MobileNav 
          redditProfile={profile}
          extended={extendedNav}
          setExtended={() => setExtended(false)}
        />
        <div className="nav-toggle pos-a" onClick={() => setExtended(!extended)}>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
          <span className="toggle-line"></span>
        </div>
      </div>
    </header>
  );
}));

export default Header;