import React, { useEffect, useState } from 'react'
import './Posts.scss';
import SubredditPost from '../SubredditPost/SubredditPost';
import { inject, observer } from 'mobx-react';

const Posts = inject("UserStore", "PostStore")(observer(({posts, loading, setPosts, UserStore, PostStore}) => {
  const [ usedPosts, setUsedPosts ] = useState([]);
  const [ endIndex, setEndIndex ] = useState(40);

  useEffect(() => {
    const user = UserStore.getUser();
    if (user) setUsedPosts([...user.storiesUsed]);
  }, []);

  useEffect(() => {
    document.addEventListener('scroll', infiniteScroll);

    return () => {
      document.removeEventListener('scroll', infiniteScroll);
    };
  }, [endIndex])

  const infiniteScroll = () => {
    const list = document.querySelector('.App');

    if ( isInViewport(list) ) {
      setEndIndex(endIndex + 40);
    }
  }
  

  if ( posts.length > 0 && !loading ) {
    return (
      <ul className="post-list mt+">

        {posts.slice(0, endIndex).map(x => {
          return(
            <SubredditPost 
              key={x.id} 
              x={x}
              setPosts={setPosts}
              onClick={(e) => selectPost(e, PostStore)}
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


var isInViewport = function (elem) {
  var bounding = elem.getBoundingClientRect();
  return (
      bounding.bottom <= ((window.innerHeight + 200) || document.documentElement.clientHeight)
  );
};

 const selectPost = (x, PostStore) => {
  PostStore.setSelectedPosts(x);
}

export default Posts;