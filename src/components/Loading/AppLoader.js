import React from "react";
import "./AppLoader.css";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

export default function AppLoader({ state }) {
  return (
    <DisplayWrapper>
      <div className="app-loader-wrapper">
        <div className="lds-default">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h1 className="state-title">{state}</h1>
      </div>
    </DisplayWrapper>
  );
}
