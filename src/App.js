import React, { useState } from 'react';
import './app.scss';
import PostFetch from './components/PostFetch/PostFetch';
import { observer } from 'mobx-react-lite';
import NewVisitor from './components/NewVisitor/NewVisitor';
import AppLoader from './components/Loading/AppLoader';
import { getSubreddits } from './helpers/getSubreddits';
import ScrollToTop from './layouts/ScrollToTop/ScrollToTop';
import UsedBy from './layouts/UsedBy/UsedBy';
import DisplayWrapper from './layouts/DisplayWrapper/DisplayWrapper';
import Aside from './layouts/Aside/Aside';
import Announcement from './layouts/Announcement/Announcement';

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
      className="d-f fx-2 jc-c mt+"
      announcementTitle="Getting Started"
      announcementBody="Enter the subreddit you want to search, in the subreddit field. Then click 'Get Posts'"
    > 
      <main>
        <div className="App w-100pr pl+ pr+ ">
          
          <PostFetch />
          {(newVisitor === "null" || newVisitor === null) &&
            <NewVisitor 
              setLoad={setLoad}
              handleClick={handleClick}
            />
          }
          <ScrollToTop />

        </div>
      </main>
      <Aside>
        <h3>Used By</h3>
        <UsedBy/>
      </Aside>
    </DisplayWrapper>
  );
});

export default App;
