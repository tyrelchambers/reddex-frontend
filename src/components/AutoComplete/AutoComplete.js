import React, { useEffect, useRef} from 'react'

const AutoComplete = ({subreddits, subreddit, setSubreddit, inputRef}) => {
  const ref = useRef();

  useEffect(() => {
    // add when mounted
    document.addEventListener("mouseup", handleClick);
    // return function to be called when unmounted
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, []);

  const handleClick = e => {
    if (ref.current.contains(e.target) || inputRef.current.contains(e.target)) {
      // inside click
      console.log('true')
      return ref.current.classList.remove("hidden");
    } 

    ref.current.classList.add("hidden")
   }

  if( subreddits.length > 0 && subreddit ) {
    return(
      <ul className="autocomplete-list" ref={ref}>
        {subreddits
        .filter(x => !subreddit || x.subreddit.includes(subreddit))
        .map(x=> {
          const indexOfText = x.subreddit.indexOf(subreddit);
          return (
            <li className="autocomplete-item" onClick={() => setSubreddit(x.subreddit)}>
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
  return null
 }  

 export default AutoComplete;