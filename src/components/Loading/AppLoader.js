import React from 'react'
import './AppLoader.scss';

export default function AppLoader({state}) {
  return (
    <div className="app-loader-wrapper">
      <div class="lds-default"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <h1 className="state-title">{state}</h1>
    </div>
  )
}
