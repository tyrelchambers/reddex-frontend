import React from 'react';
import './About.scss';
import DisplayWrapper from '../../layouts/DisplayWrapper/DisplayWrapper';
import { MainButton, MinimalButton } from '../../components/Buttons/Buttons';

{/* <a href="https://youtube.com/storiesaftermidnight" target="_blank" rel="noopener noreferrer">myself</a> */}
const About = () => {
  return(
    <DisplayWrapper hasHeader={true}>
      <div className="about-wrapper ml-a mr-a d-f fxd-c ai-c jc-c animated fadeIn">
        <h1 className="about-title">What is Reddex?</h1>
        <p className="about-subtitle">Reddex is a toolkit for Youtube narrators. The goal is simple: provide an application to help narrators be productive creators.</p>  
      </div>
    </DisplayWrapper>
  );
  
}

export default About;
