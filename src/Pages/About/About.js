import React from "react";
import "./About.scss";
import DisplayWrapper from "../../layouts/DisplayWrapper/DisplayWrapper";
import { MainButton } from "../../components/Buttons/Buttons";
import {
  H1,
  H2Subtitle,
  H1Subtitle,
  H2,
} from "../../components/Headings/Headings";
const pic1 = require("../../assets/1.svg");
const pic2 = require("../../assets/2.svg");
const pic3 = require("../../assets/3.svg");
const pic4 = require("../../assets/4.svg");
const pic5 = require("../../assets/5.svg");
const pic6 = require("../../assets/6.svg");
const pic7 = require("../../assets/7.svg");

const About = () => {
  return (
    <DisplayWrapper>
      <div className="about-wrapper ml-auto mr-auto flex flex-col items-center mt-6 ">
        <H1>About Reddex</H1>
        <H1Subtitle className="text-center">
          Reddex is a toolkit for Youtube narrators. The goal is simple: provide
          an application to help narrators be productive creators.
        </H1Subtitle>

        <div className="about-block right">
          <img
            className="about-block-img"
            src={pic3}
            alt="Person stanging beside graph"
          />
          <div className="flex flex-col about-block-body">
            <H2>Grab posts from any subreddit</H2>
            <H2Subtitle className="mt-2">
              With Reddex, you can grab up to 1000 posts from any subreddit just
              by entering it in the input field on the main page!
            </H2Subtitle>
          </div>
        </div>

        <div className="about-block left">
          <img
            className="about-block-img"
            src={pic6}
            alt="Person standing beside webpage"
          />
          <div className="flex flex-col about-block-body">
            <H2>Build your own static site</H2>
            <H2Subtitle className="mt-2">
              Need a website? Use Reddex to give yourself a place for your
              followers to see your latest videos, send you their own stories,
              and all your social media links!{" "}
            </H2Subtitle>
          </div>
        </div>

        <div className="about-block right">
          <img
            className="about-block-img"
            src={pic2}
            alt="Person standing beside cellphone"
          />
          <div className="flex flex-col about-block-body">
            <H2>Your own contact list</H2>
            <H2Subtitle className="mt-2">
              If you're having trouble remembering who let's you do what, add
              them to your contact list and free your mind of that burden!
            </H2Subtitle>
          </div>
        </div>

        <div className="about-block left">
          <img
            className="about-block-img"
            src={pic1}
            alt="Female typing at a computer"
          />
          <div className="flex flex-col about-block-body">
            <H2>Message authors right from Reddex</H2>
            <H2Subtitle className="mt-2">
              Forget about about leaving Reddex and trying to fight your way to
              that author's profile. Queue up your messages and send your
              request with just one click!
            </H2Subtitle>
          </div>
        </div>

        <div className="about-block right">
          <img
            className="about-block-img"
            src={pic4}
            alt="Person standing beside checklist"
          />
          <div className="flex flex-col about-block-body">
            <H2>Reading list</H2>
            <H2Subtitle className="mt-2">
              Keep track of the stories you've been given permission to read,
              and the stories you've completed, with a reading list!
            </H2Subtitle>
          </div>
        </div>

        <div className="about-block left">
          <img
            className="about-block-img"
            src={pic5}
            alt="Person standing beside cellphone showing a conversation"
          />
          <div className="flex flex-col about-block-body">
            <H2>Send messages using your Reddit account</H2>
            <H2Subtitle className="mt-2">
              Use your Reddex inbox to send messages to other Redditor's. This
              makes it easier to reply to those who've mesaged you, without
              having to leave Reddex!
            </H2Subtitle>
          </div>
        </div>

        <div className="about-block right">
          <img
            className="about-block-img"
            src={pic7}
            alt="Finger interacting with a cellphone touchscreen"
          />
          <div className="flex flex-col about-block-body">
            <H2>Post filtering</H2>
            <H2Subtitle className="mt-2">
              If you're looking for something super specific, try out filtering!
              Show the posts that are best suited for you through filtering by
              upvotes, keywords, or series only!
            </H2Subtitle>
          </div>
        </div>

        <div className="about-cta flex flex-col items-center mt-6">
          <H1>Like what you've read?</H1>
          <MainButton
            value="Get Signed Up"
            className="btn btn-primary mt-6"
            onClick={() => (window.location.pathname = "/signup")}
          >
            <i className="fas fa-jedi mr-2"></i>
          </MainButton>
        </div>
      </div>
    </DisplayWrapper>
  );
};

export default About;
