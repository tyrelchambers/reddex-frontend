import React from 'react';
import './About.scss';

const About = (props) => {
  return(
    <div className="about-wrapper ml-a mr-a d-f fxd-c ai-c jc-c">
      <h1>What is Reddex</h1>
      <p>Reddex is a little tool (right now) to fetch posts from reddit. You can get up 1000 posts from different subreddit categories. With this data, you can also filter by upvote count and keywords. This was made to help narrators such as <a href="https://youtube.com/storiesaftermidnight" target="_blank">myself</a>, to find stories without having to scroll for many minutesl, 10s of minutes, through each subreddit.</p>
    </div>
  );
  
}

export default About;
