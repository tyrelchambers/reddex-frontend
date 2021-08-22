import React from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import "./Twitter.css";

const Twitter = ({ config }) => {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName={config.twitter_id}
      options={{ height: 400 }}
    />
  );
};

export default Twitter;
