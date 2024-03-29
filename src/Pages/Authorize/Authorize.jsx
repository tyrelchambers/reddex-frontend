import React from "react";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import "./Authorize.css";

const Authorize = () => {
  const askForRedditApproval = () => {
    const link = `https://www.reddit.com/api/v1/authorize?client_id=${process.env.REACT_APP_REDDIT_APP_NAME}&response_type=code&state=storiesaftermidnightreddex&redirect_uri=${process.env.REACT_APP_REDIRECT}/signup&duration=permanent&scope=privatemessages identity`;
    window.location.href = link;
  };
  return (
    <DisplayWrapper>
      <div className="flex flex-col items-center justify-center authorize-wrapper">
        <h1 className="mb-6 text-center font-bold">Signup With Reddex</h1>
        <p className="subtle mt-6 mb-6">
          In order to signup for a Reddex profile, you'll have to agree to let
          Reddex access your Reddit profile, but don't worry! Reddex will{" "}
          <em>not</em> use your profile for evil or malicious purposes. This is
          so you can have access to your inbox, and the ability to send messages
          to authors.
        </p>

        <button
          className="btn btn-primary"
          onClick={() => {
            askForRedditApproval();
          }}
        >
          Authenticate With Reddit
        </button>
      </div>
    </DisplayWrapper>
  );
};

export default Authorize;
