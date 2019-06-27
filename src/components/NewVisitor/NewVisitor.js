import React, { useState } from 'react'
import './NewVisitor.scss';
import { getSubreddits } from '../../helpers/getSubreddits';
import AppLoader from '../Loading/AppLoader';

export default function NewVisitor({setLoad, handleClick}) {
  return (
    <div className="d-f new-visitor-wrapper jc-sb animated fadeInUp">
      <div className="d-f fxd-c">
        <h3 className="mb--">Autopopulate Subreddits?</h3>
        <p className="subtle ta-l">Welcome! Would you like to preload Subreddits to make use of our search autocomplete? (About 30-60 seconds; lots of subreddits)</p>
      </div>

      <div className="d-f">
        <button className="btn btn-tiertiary m- as-c " onClick={e => {
          handleClick(e)
        }}>No</button>
        <button className="btn btn-tiertiary btn-green m- as-c " onClick={(e) => {
          setLoad(true)
          handleClick(e, true)
        }}>Yes</button>
      </div>
    </div>
  )
}
