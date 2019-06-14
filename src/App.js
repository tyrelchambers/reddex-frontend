import React, { useContext } from 'react';
import './app.scss';
import PostFetch from './components/PostFetch/PostFetch';
import { observer } from 'mobx-react-lite';

const App = observer(() => {

  return (
    <div className="App w-100pr ml-a mr-a">
      <div className="mb-">
        <h1 className="ta-c mb+">Reddex</h1>
        <h4 className="ta-c">Developer Notes:</h4>
        <p className="ta-c">In order to change current filters, you'll have to click "Reset Filters", then apply the filters you want</p>
      </div>
      <PostFetch />
      
    </div>
  );
});

export default App;
