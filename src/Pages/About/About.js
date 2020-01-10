import React from 'react';
import './About.scss';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { MainButton } from '../../components/Buttons/Buttons';
const pic1 = require('../../assets/1.svg')
const pic2 = require('../../assets/2.svg')
const pic3 = require('../../assets/3.svg')
const pic4 = require('../../assets/4.svg')
const pic5 = require('../../assets/5.svg')
const pic6 = require('../../assets/6.svg')
const pic7 = require('../../assets/7.svg')

{/* <a href="https://youtube.com/storiesaftermidnight" target="_blank" rel="noopener noreferrer">myself</a> */}
const About = () => {
  return(
    <DisplayWrapper hasHeader={true}>
      <div className="about-wrapper ml-a mr-a d-f fxd-c ai-c mt+ animated fadeIn">
        <h1 className="about-title">What is Reddex?</h1>
        <p className="about-subtitle mb+">Reddex is a toolkit for Youtube narrators. The goal is simple: provide an application to help narrators be productive creators.</p>  

        <div className="about-block right">
          <img className="about-block-img" src={pic3}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Grab posts from any subreddit</h3>
            <p>With Reddex, you can grab up to 1000 posts from any subreddit just by entering it in the input field on the main page!</p>
          </div>
        </div>

        <div className="about-block left">
          <img className="about-block-img" src={pic6}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Build your own static site</h3>
            <p>Need a website? Use Reddex to give yourself a place for your followers to see your latest videos, send you their own stories, and all your social media links! </p>
          </div>
        </div>

        <div className="about-block right">
          <img className="about-block-img" src={pic2}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Your own contact list</h3>
            <p>If you're having trouble remembering who let's you do what, add them to your contact list and free your mind of that burden!</p>
          </div>
        </div>

        <div className="about-block left">
          <img className="about-block-img" src={pic1}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Message authors right from Reddex</h3>
            <p>Forget about about leaving Reddex and trying to fight your way to that author's profile. Queue up your messages and send your request with just one click!</p>
          </div>
        </div>

        <div className="about-block right">
          <img className="about-block-img" src={pic4}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Reading list</h3>
            <p>Keep track of the stories you've been given permission to read, and the stories you've completed, with a reading list!</p>
          </div>
        </div>

        <div className="about-block left">
          <img className="about-block-img" src={pic5}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Send messages using your Reddit account</h3>
            <p>Use your Reddex inbox to send messages to other Redditor's. This makes it easier to reply to those who've mesaged you, without having to leave Reddex!</p>
          </div>
        </div>

        <div className="about-block right">
          <img className="about-block-img" src={pic7}/>
          <div className="d-f fxd-c about-block-body">
            <h3>Post filtering</h3>
            <p>If you're looking for something super specific, try out filtering! Show the posts that are best suited for you through filtering by upvotes, keywords, or series only!</p>
          </div>
        </div>

        <div className="about-cta d-f fxd-c ai-c mt+">
          <h1>Like what you've read?</h1>
          <MainButton
            value="Get Signed Up"
            className="btn btn-primary mt+"
          >
            <i className="fab fa-jedi-order mr-"></i>
          </MainButton>
        </div>
      </div>
    </DisplayWrapper>
  );
  
}

export default About;
