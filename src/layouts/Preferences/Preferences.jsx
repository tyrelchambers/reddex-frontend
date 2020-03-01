import React, { useState } from 'react';
import './Preferences.scss'

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
      <i className="fas fa-adjust"></i>
      <p className="dark-mode-on">Light mode</p>
    </button>
  ) : (
    <button className="pref dark-mode-switch d-f ai-c" onClick={() => {
      toggleTheme('dark')
    }}>
      <i className="fas fa-adjust flipped"></i>
      <p>Dark mode</p>
    </button>
  )
  return (
    <div className="d-f">
      {switcher}
    </div>
  );
}

export default Preferences;
