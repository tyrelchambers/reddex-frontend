import React, { useState, useEffect, useContext } from 'react'
import './MessageAuthors.scss';
import { observer } from 'mobx-react-lite';
import UserStore from '../../stores/UserStore';
import Axios from 'axios';

const MessageAuthors = observer(({data, posts}) => {
  const [authorPosts, setAuthorPosts] = useState([]);
  const store = useContext(UserStore);
  const userId = store.getUser().uid;
  const user = store.getUserProfile(userId);

  const mockUser = 'ChapStique43';

  useEffect(() => {
    findPostsFromSelected(data, posts, setAuthorPosts);
  }, [data]);
  return (
    <div className="message-author-box mt+ mb+">
      <div className="message-author-box-header">
        <h3>You've selected {data.length} authors to message.</h3>
      </div>

      <div className="message-author-body p-">
        <div>
          <h4 className="mb+">Message Preview</h4>

          <h5 className="mb+">Subject</h5>
          <p className="default-message-holder mw-500 lh-1-8">{console.log(posts)}</p>
          <p className="default-message-holder mw-500 lh-1-8" id="defaultMessageHolder">
            {user.defaultMessage}
          </p>
          <p className="subtle mt+ mb+">Please remember, you're sending a message to multiple people, use this tool responsibly.</p>
          <button className="btn btn-primary" onClick={() => sendMessageToAuthors(mockUser)}>Send Message(s)</button>
        </div>
      </div>
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

const sendMessageToAuthors = async (author) => {
  const tokens = JSON.parse(window.localStorage.getItem('reddit_tokens')).access_token;
  const subject = "Test message";
  const link = `https://oauth.reddit.com/api/compose`;
  const msg = window.localStorage.getItem("default_message");
  const body = new FormData();
  body.set('to', `/u/${author}`);
  body.set("subject", subject);
  body.set("text", msg);

  await Axios.post(link, body, {
    headers: {
      "Authorization": `bearer ${tokens}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
  .then(console.log)
  .catch(console.log);
  
}


export default MessageAuthors;