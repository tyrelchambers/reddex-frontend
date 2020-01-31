import React from 'react';
import './404.scss'
const Page404 = () => {
  return (
    <div className="wrapper-404 d-f fxd-c ai-c jc-c">
      <section class="error-container">
        <span class="four"><span class="screen-reader-text">4</span></span>
        <span class="zero"><span class="screen-reader-text">0</span></span>
        <span class="four"><span class="screen-reader-text">4</span></span>
      </section>
      <h1 style={{color:'#E0787F'}}>Hey! As you can see, nothing is here!</h1>
      <a href="/" className="back-home">Retreat to safety</a>
    </div>
  );
}

export default Page404;
