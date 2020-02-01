import React, { useState } from 'react';
import './app.scss';
import PostFetch from './components/PostFetch/PostFetch';
import { observer } from 'mobx-react-lite';
import NewVisitor from './components/NewVisitor/NewVisitor';
import AppLoader from './components/Loading/AppLoader';
import { getSubreddits } from './helpers/getSubreddits';
import ScrollToTop from './layouts/ScrollToTop/ScrollToTop';
import DisplayWrapper from './layouts/DisplayWrapper/DisplayWrapper';
import Preferences from './layouts/Preferences/Preferences';

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
      window.localStorage.setItem("pulled_subreddits", true)
      getSubreddits().then(res => setLoad(false));
    } else {
      window.localStorage.setItem("pulled_subreddits", false);
    }

    e.target.closest(".new-visitor-wrapper").classList.remove("fadeInUp");
    e.target.closest(".new-visitor-wrapper").classList.add("fadeOutDown");

    window.localStorage.setItem("new_visitor", false);
  }

  return (
    <DisplayWrapper
      hasHeader={true}
    > 
      <div className="d-f fxd-c ai-c mt+ mobile-column-1024">
        <Preferences />
        <main className="App fx-1 pl+ pr+ ">  
          <PostFetch />
          {(newVisitor === "null" || newVisitor === null) &&
            <NewVisitor 
              setLoad={setLoad}
              handleClick={handleClick}
            />
          }
          <ScrollToTop />  
        </main>
      </div>
    </DisplayWrapper>
  );
});

export default App;
