import React, { useEffect, useState } from 'react'
import './Posts.scss';
import SubredditPost from '../SubredditPost/SubredditPost';
import { inject, observer } from 'mobx-react';

const Posts = inject("UserStore")(observer(({posts, loading, selectedPosts, setPosts, selectPost, UserStore}) => {
  const [ usedPosts, setUsedPosts ] = useState([]);
  useEffect(() => {
    const user = UserStore.getUser();
    if (user) setUsedPosts([...user.storiesUsed]);
    
  }, []);

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
              postIds={usedPosts}
q            />
          )
        })}
      </ul>
    )
  } else {
    return null;
  }
}));

export default Posts;