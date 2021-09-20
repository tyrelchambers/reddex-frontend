import React from "react";
import ToggleStatus from "../../../../components/ToggleStatus/ToggleStatus";
import { inject } from "mobx-react";
import { observer } from "mobx-react-lite";

const Twitter = inject("SiteStore")(
  observer(({ SiteStore }) => {
    return (
      <div className="timeline twitter mt-6">
        <div className="flex">
          <div className="mr-6 mt-2">
            <ToggleStatus
              context="twitter_timeline"
              option="Inactive"
              disabledText="Active"
              setToggledHandler={() => {
                SiteStore.setConfig({
                  twitter_timeline: !SiteStore.config.twitter_timeline,
                });
              }}
              toggled={SiteStore.config.twitter_timeline ? true : false}
            />
          </div>
          <div className="flex flex-col">
            <h2>Twitter</h2>
            <p className="subtle mb-2">
              Activate to show tweets from your profile
            </p>
          </div>
        </div>

        {SiteStore.config.twitter_timeline && (
          <div className="w-234px mt-2">
            <h4>Enter your Twitter handle</h4>
            <div className="flex items-center multi-input mt-2">
              <span className="preffix">
                <i className="fab fa-twitter"></i>
              </span>
              <input
                type="text"
                className="form-input w-full has-preffix"
                placeholder="Twitter handle"
                value={SiteStore.config.twitter_id}
                onChange={(e) =>
                  SiteStore.setConfig({ twitter_id: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>
    );
  })
);

export default Twitter;
