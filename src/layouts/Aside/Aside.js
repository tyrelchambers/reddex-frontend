import React from 'react'
import './Aside.scss'

const Aside = ({classNames = "", children}) => {
  return (
    <aside
      className={`aside lifted ${classNames}`}
    >
      {children}
    </aside>
  )
}

export default Aside
