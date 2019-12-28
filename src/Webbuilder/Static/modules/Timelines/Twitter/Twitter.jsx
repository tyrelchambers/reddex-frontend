import React from 'react';
import { TwitterTimelineEmbed } from 'react-twitter-embed'
import './Twitter.scss'

const Twitter = ({config}) => {
  return (
    <TwitterTimelineEmbed
      sourceType="profile"
      screenName={config.twitterId}
      options={{height: 400}}
    />
  );
}

export default Twitter;
