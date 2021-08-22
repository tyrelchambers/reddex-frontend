import React from "react";
import "./app.css";
import PostFetch from "./components/PostFetch/PostFetch.jsx";
import ScrollToTop from "./layouts/ScrollToTop/ScrollToTop";
import DisplayWrapper from "./layouts/DisplayWrapper/DisplayWrapper";

const App = () => {
  return (
    <DisplayWrapper>
      <div className="flex flex-col items-center mt-6">
        <main className="App p-4 w-full flex-1">
          <PostFetch />
          <ScrollToTop />
        </main>
      </div>
    </DisplayWrapper>
  );
};

export default App;
