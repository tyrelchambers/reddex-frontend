import React from "react";
import "./Loading.css";

const Loading = ({ title, subtitle }) => {
  return (
    <div className="loading-wrapper flex flex-col items-center">
      <div className="loader mb-6 mt-6"></div>
      <p className="text-center text-3xl font-bold">{title}</p>
      <p className="text-center text-xl">{subtitle}</p>
    </div>
  );
};

export default Loading;
