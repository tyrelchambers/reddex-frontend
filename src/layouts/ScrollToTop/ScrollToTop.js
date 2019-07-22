import React from 'react'
import './ScrollToTop.scss';

const ScrollToTop = () => {
  return (
    <div className="scroll-to-top" id="scrollToTop" onClick={() => window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })}>
      <i className="fas fa-chevron-circle-up"></i>
    </div>
  )
}

export default ScrollToTop
