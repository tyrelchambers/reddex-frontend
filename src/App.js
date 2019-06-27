import React, { useState } from 'react';
import './app.scss';
import PostFetch from './components/PostFetch/PostFetch';
import { observer } from 'mobx-react-lite';
import NewVisitor from './components/NewVisitor/NewVisitor';
import AppLoader from './components/Loading/AppLoader';
import { getSubreddits } from './helpers/getSubreddits';

const App = observer(() => {
  const newVisitor = (window.localStorage.getItem("new_visitor"));
  const [ load, setLoad ] = useState(false)

  if ( load ) {
    return (
      <AppLoader
        state="Grabbing Subreddits..."
      />
    );  
  }

  const handleClick = (e, status) => {
    if ( status ) {
      getSubreddits().then(res => setLoad(false));
    }

    e.target.closest(".new-visitor-wrapper").classList.remove("fadeInUp");
    e.target.closest(".new-visitor-wrapper").classList.add("fadeOutDown");

    window.localStorage.setItem("new_visitor", false)
  }

  return (
    <div className="App w-100pr ml-a mr-a">
      <div className="mb-">
        <h1 className="ta-c mb+">Reddex</h1>
        <h4 className="ta-c">Getting started:</h4>
        <p className="ta-c">In the input field below, enter the subreddit that you want to get posts from. It will fetch up 1000 posts in a few seconds, then you can sort how you'd like! Hopefully this will help you find the good stuff, quicker.</p>
      </div>
      <PostFetch />
      {(newVisitor === "null" || newVisitor === null) &&
        <NewVisitor 
          setLoad={setLoad}
          handleClick={handleClick}
        />
      }
    </div>
  );
});

export default App;
