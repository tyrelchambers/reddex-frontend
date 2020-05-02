import React, { useEffect, useState } from 'react'
import './Posts.scss';
import { inject, observer } from 'mobx-react';
import { getAxios } from '../../api';
import SubredditPost from '../SubredditPost/SubredditPost'

const Posts = inject("PostStore")(observer(({loading, setPosts, PostStore}) => {
  const [ usedPosts, setUsedPosts ] = useState([]);
  const [ endIndex, setEndIndex ] = useState(40);
  const token = window.localStorage.getItem('token');

  useEffect(() => {

    if( token ) {
      const fn = async () => {
        await getAxios({
          url: '/profile/stories_used'
        }).then(res => {
          if ( res ) {
            setUsedPosts([...res])
          }
        });
      }
      
      fn();
    }
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
  
  const isPostUsed = (post) => {
    for (let i = 0; i < usedPosts.length; i++ ) {
      if (usedPosts[i].post_id === post.post_id) {
        return true;
      }
    }
  }

  if ( PostStore.posts.length > 0 && !loading ) {
    return (
      <ul className="post-list mt+">

        {PostStore.posts.slice(0, endIndex).sort((a, b) => {
          return b.created - a.created
        }).map((x, id) => {
          return(
            <SubredditPost
            key={id}
              x={x}
              setPosts={setPosts}
              onClickHandler={() => selectPost(x, PostStore)}
              used={isPostUsed(x)}
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