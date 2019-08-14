import React from 'react'
import './Hero.scss';
import reddexLogo from '../../assets/reddex-logo.svg';
import divider from '../../assets/divider.svg';

const Hero = () => {
  return (
    <div className="hero d-f jc-c ai-c fxd-c">
      <div className="mb- d-f fxd-c ai-c">
        <img src={reddexLogo} className='w-266px mb+ hero-logo' alt=""/>
        <h1 className="hero-subtitle">A Toolkit for Youtube Narrators</h1>
      </div>

      <img src={divider} alt="" className="hero-divider"/>
    </div>
  )
}

export default Hero
