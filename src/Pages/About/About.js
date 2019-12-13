import React from 'react';
import './About.scss';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { MainButton, MinimalButton } from '../../components/Buttons/Buttons';

const About = () => {
  return(
    <DisplayWrapper hasHeader={true}>
      <div className="about-wrapper ml-a mr-a d-f fxd-c ai-c jc-c animated fadeIn">
        <h1 className="about-title">What is Reddex?</h1>
        <p className="about-subtitle">Reddex is a little tool (right now) to fetch posts from reddit. You can get up 1000 posts from different subreddit categories. With this data, you can also filter by upvote count and keywords. This was made to help narrators such as <a href="https://youtube.com/storiesaftermidnight" target="_blank" rel="noopener noreferrer">myself</a>, to find stories without having to scroll for many minutes, 10s of minutes, through each subreddit.</p>

        <div className="pricing-wrapper">
          <div className="pricing-headers">
            <div className="empty block"></div>

            <div className="block">
              <h3 className="block-title">Basic</h3>
              <h5 className="block-subtitle">Free</h5>
              
              <div className="mt-">
              <MinimalButton
                onClick={() => window.location.pathname = "/signup"}
              >
                <i className="fas fa-user-plus"></i>
                Sign Up
              </MinimalButton>
              </div>
            </div>
          </div>

          <div className="pricing-table">
            <div className="row">
              <div className="subtitle">Searchable Reddit Inbox</div>
              <i class="fas fa-check row-check"></i>
            </div>

            <div className="row">
              <div className="subtitle">Send &amp; Receiv Messages</div>
              <i class="fas fa-check row-check"></i>
            </div>

            <div className="row">
              <div className="subtitle">Reading List</div>
              <i class="fas fa-check row-check"></i>
            </div>

            <div className="row">
              <div className="subtitle">Select Multiple Posts</div>
              <i class="fas fa-check row-check"></i>
            </div>

            <div className="row">
              <div className="subtitle">Ask For Permission</div>
              <i class="fas fa-check row-check"></i>
            </div>

            <div className="row">
              <div className="subtitle">Contact List</div>
              <i class="fas fa-check row-check"></i>
            </div>
          </div>
        </div>  
      </div>
    </DisplayWrapper>
  );
  
}

export default About;
