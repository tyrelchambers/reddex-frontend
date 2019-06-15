import React, { useContext } from 'react';
import './app.scss';
import PostFetch from './components/PostFetch/PostFetch';
import { observer } from 'mobx-react-lite';

const App = observer(() => {

  return (
    <div className="App w-100pr ml-a mr-a">
      <div className="mb-">
        <h1 className="ta-c mb+">Reddex</h1>
        <h4 className="ta-c">Getting started:</h4>
        <p className="ta-c">In the input field below, enter the subreddit that you want to get posts from. It will fetch up 1000 posts in a few seconds, then you can sort how you'd like! Hopefully this will help you find the good stuff, quicker.</p>
      </div>
      <PostFetch />
      
    </div>
  );
});

export default App;
