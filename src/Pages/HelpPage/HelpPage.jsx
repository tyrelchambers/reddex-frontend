import React from "react";
import "./HelpPage.scss";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";

const HelpPage = () => {
  return (
    <DisplayWrapper>
      <div className="container flex flex-col center mt-6 mb-6 help-wrapper">
        <h1 className="title text-center mb-2">Help</h1>
        <p className="text-center">
          Need some help using Reddex? Check out the topics below.
        </p>
        <p className="text-center">
          If you need additional help or if you found a bug, email me at{" "}
          <a href="mailto: reddexapp@gmail.com">reddexapp@gmail.com</a>
        </p>
        <div className="flex flex-col mt-6">
          <div className="flex help-item items-center">
            <i className="fas fa-life-ring mr-2"></i>
            <p>
              Visit the Help section:{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://www.notion.so/reddex/Reddex-Help-Center-073a7bf5039c40769cc627bf8f38e1e7"
              >
                help topics
              </a>
            </p>
          </div>

          <div className="flex help-item items-center">
            <i className="fas fa-glass-cheers mr-2"></i>
            <p>
              Want to see what's new?{" "}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://headwayapp.co/reddex-changelog"
              >
                Reddex changelog
              </a>
            </p>
          </div>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default HelpPage;
