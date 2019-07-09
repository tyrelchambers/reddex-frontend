import React from 'react'
import './Posts.scss';
import SubredditPost from '../SubredditPost/SubredditPost';
import { compareDesc } from 'date-fns';

export default function Posts({posts, loading, selectedPosts, setPosts, selectPost}) {
  if ( posts.length > 0 && !loading ) {
    return (
      <ul className="post-list d-f animated fadeIn">

        {posts.slice(0, 40).sort((a, b) => {
          return b.ups - a.ups;
        }).map(x => {
          return(
            <SubredditPost 
              key={x.id} 
              x={x}
              setPosts={setPosts}
              onClick={selectPost}
              selectedPosts={selectedPosts}
            />
          )
        })}
      </ul>
    )
  } else {
    return null;
  }
}
