import React, { useEffect, useState } from 'react'
import './Posts.scss';
import SubredditPost from '../SubredditPost/SubredditPost';
import { inject, observer } from 'mobx-react';

const Posts = inject("UserStore", "PostStore")(observer(({posts, loading, setPosts, UserStore, PostStore}) => {
  const [ usedPosts, setUsedPosts ] = useState([]);

  useEffect(() => {
    const user = UserStore.getUser();
    if (user) setUsedPosts([...user.storiesUsed]);
  });

  if ( posts.length > 0 && !loading ) {
    return (
      <ul className="post-list d-f ">

        {posts.slice(0, 40).sort((a, b) => {
          return b.ups - a.ups;
        }).map(x => {
          return(
            <SubredditPost 
              key={x.id} 
              x={x}
              setPosts={setPosts}
              onClick={(e) => selectPost(e, PostStore)}
              selectedPosts={() => PostStore.setSelectedPosts(x)}
              onClickHandler={() => selectPost(x, PostStore)}
              used={usedPosts.includes(x.postId)}
            />
          )
        })}
      </ul>
    )
  } else {
    return null;
  }
}));

 const selectPost = (x, PostStore) => {
  PostStore.setSelectedPosts(x);
}

export default Posts;