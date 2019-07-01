import React, { useEffect, useRef} from 'react'
import './AutoComplete.scss';

const AutoComplete = ({subreddits, subreddit, setSubreddit, inputRef}) => {
  const ref = useRef();
  const wantsSubreddits = window.localStorage.getItem("pulled_subreddits");

  useEffect(() => {
    // add when mounted
    document.addEventListener("mouseup", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (!ref.current || !inputRef.current) return;

    if (ref.current.contains(e.target) || inputRef.current.contains(e.target)) {
      // inside click
      return ref.current.classList.remove("hidden");
    } 

    ref.current.classList.add("hidden")
   }

  if ( wantsSubreddits == "true" ) {
    if( subreddits.length > 0 && subreddit.length > 2 ) {
      return(
        <ul className="autocomplete-list" ref={ref}>
          {subreddit.length > 2 && subreddits
          .filter(x => !subreddit || x.subreddit.includes(subreddit))
          .map(x=> {
            const indexOfText = x.subreddit.indexOf(subreddit);
            return (
              <li className="autocomplete-item" key={x.subreddit} onClick={() => setSubreddit(x.subreddit)}>
                <p>
                  {x.subreddit.substring(0, indexOfText)}
                  <span className="highlight-text">
                    {x.subreddit.substring(indexOfText, indexOfText + subreddit.length)}
                  </span>
                  {x.subreddit.substring(indexOfText + subreddit.length)}
                </p>
              </li>
            )
          })}
        </ul>
      )
    }
  }
  return null
 }  

 export default AutoComplete;