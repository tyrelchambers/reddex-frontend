import React, { useState, useEffect, useContext } from 'react'
import './MessageAuthors.scss';
import { observer } from 'mobx-react-lite';
import ModalStore from '../../stores/ModalStore';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

const MessageAuthors = observer(({data, posts}) => {
  const [authorPosts, setAuthorPosts] = useState([]);
  const modalStore = useContext(ModalStore)

  const mockUser = 'ChapStique43';

  useEffect(() => {
    findPostsFromSelected(data, posts, setAuthorPosts);
  }, [data]);

  return (
    <div className="message-author-box mt+ mb+">
      <div className="message-author-box-header d-f jc-sb ai-c">
        <h3>You've selected {data.length} authors to message.</h3>
        <button className="btn btn-primary" onClick={() => modalStore.setIsOpen(true)}>Confirm Messages</button>

      </div>

      <div className="message-author-body p- d-f jc-c">
        <p className="subtle mt+ mb+">Confirming messages will open a pop-up that will walk you through each message to make sure it's correct. It will not send any messages.</p>
      </div>
      <ConfirmModal 
        isOpen={modalStore.isOpen}
        data={authorPosts}
      />
    </div>
  )
})

const findPostsFromSelected = (data, posts, setAuthorPosts) => {
  const results = [];
  
  for ( let i = 0; i < data.length; i++ ) {
    for ( let j = 0; j < posts.length; j++ ) {
      if ( data[i] == posts[j].id ) {
        results.push(posts[j]);
      }
    }
  } 

  setAuthorPosts([...results]);
}




export default MessageAuthors;