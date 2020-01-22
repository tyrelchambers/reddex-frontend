import React from 'react'
import './NewVisitor.scss';

export default function NewVisitor({setLoad, handleClick}) {
  return (
    <div className="d-f new-visitor-wrapper jc-sb animated fadeInUp ai-c">
      <div className="d-f fxd-c">
        <h3 className="mb--">Autopopulate Subreddits?</h3>
        <p className="subtle ta-l">Would you like to preload Subreddits to make use of our search autocomplete? (About 30-60 seconds; lots of subreddits)</p>
      </div>

      <div className="d-f visitor-actions ai-c">
        <button className="btn btn-tiertiary m- " onClick={e => {
          handleClick(e)
        }}>No</button>
        <button className="btn btn-tiertiary btn-green m- " onClick={(e) => {
          setLoad(true)
          handleClick(e, true)
        }}>Yes</button>
      </div>
    </div>
  )
}
