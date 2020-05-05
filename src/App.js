import React from 'react';
import './app.scss';
import PostFetch from './components/PostFetch/PostFetch';
import ScrollToTop from './layouts/ScrollToTop/ScrollToTop';
import DisplayWrapper from './layouts/DisplayWrapper/DisplayWrapper';

const App = () => {

  return (
    <DisplayWrapper
      
    > 
      <div className="d-f fxd-c ai-c mt+ mobile-column-1024">
        <main className="App fx-1 pl+ pr+ ">  

          <PostFetch />
          <ScrollToTop />  
        </main>
      </div>
    </DisplayWrapper>
  );
};

export default App;
