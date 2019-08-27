import React, { useState } from 'react'
import './Aside.scss'

const Aside = ({classNames = "", children}) => {
  const [extended, setExtended] = useState(false);
  const extendedAside = extended ? "extended-aside" : "";

  return (
    <div className={`aside-wrapper ${extendedAside}`}>
      <div className="aside-toggle" onClick={() => setExtended(!extended)}>
        <div className="aside-toggle-item"></div>
        <div className="aside-toggle-item"></div>
        <div className="aside-toggle-item"></div>
      </div>
      <aside
        className={`aside lifted ${classNames} `}
      >
        
        {children}
      </aside>
    </div>
  )
}

export default Aside
