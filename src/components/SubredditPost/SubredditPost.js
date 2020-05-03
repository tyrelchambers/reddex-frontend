import React from 'react';
import dateFns from 'date-fns';
import moment from 'moment';
import './SubredditPost.scss';
import '../PostFetchComp/PostFetchComp.scss'
import { inject, observer } from 'mobx-react';

const SubredditPost = inject("UserStore", "PostStore")(observer(({x, UserStore, used, onClickHandler, PostStore, key }) => {
  let selectedClass = false

  const _ = PostStore.selectedPosts.find((el) => {
    return el.post_id == x.post_id;
  });

  if ( _ ) {
    selectedClass = true;
  }

  return(
    <li 
      className={`d-f fxd-c subreddit-post-parent post animated fadeIn ${selectedClass ? "active-post-select" : ""} ${used ? "has-been-used" : ""} `} 
      data-postid={x.post_id}
      key={key}
    >
      
      <div className="d-f fxd-c w-100pr fx-1">
        <div className={`upvotes d-f jc-sb ai-c ${x.viewed ? "post-viewed" : ""}`}>
          <div className="d-f ai-c">
            <i className="fas fa-arrow-circle-up mr-"></i>  
            <h1>{x.ups}</h1>
          </div>
          <div className="d-f ai-c">
            {used &&
              <span className="has-been-used-text mr-">
                <p>Used</p>
              </span>
            }
            <div className="post-upvote-ratio">
              <span className="ratio-thumbs">
                <i className="fas fa-thumbs-up"></i>
                <i className="far fa-thumbs-down"></i>
              </span>
              <p>{x.upvote_ratio * 100} %</p>
            </div>
          </div>
        </div>
        <a href={x.url} target="_blank" rel="noopener noreferrer" className="td-n td-u-hv " onClick={() => {
          setViewedOnPost(x.post_id)
        }}>
          <p className="subreddit-title mb+  post-link" title={x.title}>{concatTitle(x.title)}</p>
        </a>
        <a href={`https://www.reddit.com/user/${x.author}`} target="_blank" rel="noopener noreferrer" className="td-n td-u-hv">
          <p className="author m-- ml- sub-detail  post-link">
            <i className="fas fa-user mr-"></i>{x.author}
          </p>
        </a>
        <p className="comments m-- ml- sub-detail"><i className="fas fa-comment-alt mr-"></i> {x.num_comments} Comments</p>
        <p className="publish-tag m-- ml- sub-detail"> <i className="fas fa-history mr-"></i>{dateFns.distanceInWordsToNow(moment.unix(x.created)._d)} ago</p>
        <div className="reading-info d-f">
        <div className="reading-time">
          <span>{avgReadingTime(x.self_text)}</span>
          min read
        </div>
      </div>
        <Flair 
          data={x.link_flair_text}
        />
      </div>
      
      <div className="d-f m- jc-sb post-actions">
        <div>
          {UserStore.getUser() &&
            <button className="btn btn-select" onClick={() => {
              onClickHandler(x);
            }}
            >
              <i className="fas fa-check"></i>
            </button>
          }
        </div>

        <a href={x.url} className="btn-link" target="_blank" rel="noopener noreferrer"  onClick={() => {
          setViewedOnPost(x.post_id)
        }}><i className="fas fa-external-link-square-alt"></i></a>
        
      </div>
    </li>
  );
}));
const Flair = ({data}) => {
  if ( data !==  null) {
    return <p className="ml- mt- mr- post-flair misc-flair">{data}</p>
  } else {
    return null;
  }

}

const setViewedOnPost = (post_id) => {
  window.db.posts.where({post_id}).modify({
    viewed: true
  })
}

const avgReadingTime = (text) => {

  const wordsPerMinute = 200; // Average case.
  let result;
  
  let textLength = text.split(" ").length; // Split by words
  if(textLength > 0){
    let value = Math.ceil(textLength / wordsPerMinute);
    result = `~${value} `;
  }

  return result;
}

const concatTitle = title => {
  const str = title.length < 70 ? title : title.slice(0,70) + "...";
  return str; 
}
export default SubredditPost;