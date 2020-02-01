import React, { useState } from 'react';
import './Preferences.scss'

const fOff = require('../../assets/flashlight-pff.svg');
const fOn = require('../../assets/flashlight-on.svg')

const Preferences = () => {
  const [theme, setTheme] = useState("" || localStorage.getItem('theme'));
  
  const setThemeHandler = (theme) => {
    setTheme(theme)
    window.localStorage.setItem('theme', theme)
    document.querySelector("body").className = `theme-${theme}`

  }

  const toggleTheme = () => {
    if (theme === "dark") {
      setThemeHandler('light')
    }  else {
      setThemeHandler('dark')
    }
  }

  const switcher = theme === 'dark' ? (
    <button className="pref dark-mode-switch d-f ai-c" onClick={() => {
      toggleTheme('light')
    }}>
      <img src={fOn} alt="Dark mode on" />
      <p className="dark-mode-on">LIGHT MODE</p>
    </button>
  ) : (
    <button className="pref dark-mode-switch d-f ai-c" onClick={() => {
      toggleTheme('dark')

    }}>
      <img src={fOff} alt="Dark mode off" />
      <p>DARK MODE</p>
    </button>
  )
  return (
    <div className="d-f jc-fs mb- mt-">
      <div className="d-f ai-c pref-wrapper">
        {switcher}
      </div>
    </div>
  );
}

export default Preferences;
