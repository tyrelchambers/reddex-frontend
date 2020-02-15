import React, { useEffect, useState, Suspense } from 'react'
import './Posts.scss';
import { inject, observer } from 'mobx-react';
import { getAxios } from '../../api';
import Loading from '../Loading/Loading'

const SubredditPost = React.lazy(() => import('../SubredditPost/SubredditPost'))

const Posts = inject("PostStore")(observer(({posts, loading, setPosts, PostStore}) => {
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
  }, [posts]);

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

  if ( posts.length > 0 && !loading ) {
    return (
      <ul className="post-list mt+">

        {posts.slice(0, endIndex).map((x, id) => {
          return(
            <Suspense key={id} fallback={<div className="lazy-gradient"></div>}>
              <SubredditPost
                x={x}
                setPosts={setPosts}
                onClickHandler={() => selectPost(x, PostStore)}
                used={isPostUsed(x)}
              />
            </Suspense>
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