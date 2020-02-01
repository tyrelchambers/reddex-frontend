import React, { useState } from 'react';
import './Preferences.scss'

const fOff = require('../../assets/flashlight-pff.svg');
const fOn = require('../../assets/flashlight-on.svg')

const Preferences = () => {
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('dark_mode'))
  
  const switcher = darkMode ? (
    <button className="pref dark-mode-switch d-f ai-c" onClick={() => {
      setDarkMode(false)
      window.localStorage.setItem('dark_mode', false)
    }}>
      <img src={fOn} alt="Dark mode off" />
      <p className="dark-mode-on">LIGHT MODE</p>
    </button>
  ) : (
    <button className="pref dark-mode-switch d-f ai-c" onClick={() => {
      setDarkMode(true)
      window.localStorage.setItem('dark_mode', true)

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
