import React, { useState } from 'react';
import './Preferences.scss'
import themes from './themes'

const Preferences = () => {
  const [customTheme, setCustomTheme] = useState("" || localStorage.getItem('theme'));
  
  const setThemeHandler = (theme) => {
    setCustomTheme(theme)
    window.localStorage.setItem('theme', theme)
    document.querySelector("body").className = `theme-${theme}`

  }

  const Render = ({theme = customTheme}) => {
    return (
      <button className="pref mode-switch d-f ai-c" onClick={() => {
        setThemeHandler(theme)
      }}>
        {themes[theme].icon}
        <p>{themes[theme].label}</p>
      </button>
    )
  }

  return (
    <div className="d-f fxd-c">
      {Object.keys(themes).map((x, id) => <Render theme={x} key={id}/>)}
    </div>
  );
}

export default Preferences;
