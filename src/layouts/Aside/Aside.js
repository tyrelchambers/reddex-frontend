import React, { useState } from 'react'
import './Aside.scss'

const Aside = ({classNames = "", children}) => {
  const [extended, setExtended] = useState(false);
  const extendedAside = extended ? "extended-aside animated slideInRight fastest" : "";

  return (
    <React.Fragment>
      <div className="aside-toggle" onClick={() => setExtended(!extended)}>
        <div className="aside-toggle-item"></div>
        <div className="aside-toggle-item"></div>
        <div className="aside-toggle-item"></div>
      </div>
    <div className={`aside-wrapper ${extendedAside}`}>
      
      <aside
        className={`aside lifted ${classNames} `}
      >
        
        {children}
      </aside>
    </div>
    </React.Fragment>
  )
}

export default Aside
