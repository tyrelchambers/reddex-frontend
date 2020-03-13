import React, { useState } from 'react';
import './Preferences.scss'
import themes from './themes'

const Preferences = () => {
  const [theme, setTheme] = useState("" || localStorage.getItem('theme'));
  
  const setThemeHandler = (theme) => {
    setTheme(theme)
    window.localStorage.setItem('theme', theme)
    document.querySelector("body").className = `theme-${theme}`

  }

  const toggleTheme = () => {
    setThemeHandler(theme)
  }

  const render = (theme) => {
    return (
      <button className="pref dark-mode-switch d-f ai-c" onClick={() => {
        toggleTheme(theme)
      }}>
        {themes[theme].icon}
        <p>{themes[theme].label}</p>
      </button>
    )
  }

  return (
    <div className="d-f">
      {Object.keys(themes).map((x, id) => (
        console.log(x)
      ))}
    </div>
  );
}

export default Preferences;
