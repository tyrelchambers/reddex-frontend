import React from "react";
import "./404.css";
const Page404 = () => {
  return (
    <div className="wrapper-404 flex flex-col items-center justify-center">
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <h1 style={{ color: "#E0787F" }}>
        Hey! As you can see, nothing is here!
      </h1>
      <a href={`https://${window.location.host}`} className="back-home">
        Retreat to safety
      </a>
    </div>
  );
};

export default Page404;
