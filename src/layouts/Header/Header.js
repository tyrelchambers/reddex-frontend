import React, { useState, useEffect } from "react";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import reddexLogo from "../../assets/watermark-green.svg";
import { inject, observer } from "mobx-react";
import MobileNav from "../Navbar/MobileNav";

const Header = inject("UserStore")(
  observer(({ UserStore }) => {
    const [extended, setExtended] = useState(false);
    const [profile, setProfile] = useState();
    const [loading, setLoading] = useState(true);
    const extendedNav = extended ? "extended" : "";

    useEffect(() => {
      const fn = async () => {
        const profile = await UserStore.getRedditProfile();
        setProfile({ ...profile });
        setLoading(false);
      };

      fn();
    }, []);

    if (loading) return null;

    return (
      <header className="header flex justify-center">
        <div className="container flex justify-between items-center">
          <div className="brand flex">
            <img src={reddexLogo} alt="Reddex" />
          </div>
          <Navbar redditProfile={profile} />
          <MobileNav
            redditProfile={profile}
            extended={extendedNav}
            setExtended={() => setExtended(false)}
          />
          <div
            className="nav-toggle absolute"
            onClick={() => setExtended(!extended)}
          >
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </div>
        </div>
      </header>
    );
  })
);

export default Header;
