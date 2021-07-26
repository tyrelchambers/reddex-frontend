import React from "react";
import "./app.scss";
import PostFetch from "./components/PostFetch/PostFetch.jsx";
import ScrollToTop from "./layouts/ScrollToTop/ScrollToTop";
import DisplayWrapper from "./layouts/DisplayWrapper/DisplayWrapper";

const App = () => {
  return (
    <DisplayWrapper>
      <div className="d-f fxd-c ai-c mt+">
        <main className="App p-4 w-full fx-1">
          <PostFetch />
          <ScrollToTop />
        </main>
      </div>
    </DisplayWrapper>
  );
};

export default App;
