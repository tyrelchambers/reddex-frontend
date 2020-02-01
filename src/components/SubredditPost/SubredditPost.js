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
      className={`d-f fxd-c subreddit-post-parent post animated fadeIn ${selectedClass ? "active-post-select" : ""} ${used ? "has-been-used" : ""}`} 
      data-id={x.id}
      data-postid={x.post_id}
      key={key}
    >
      <div className="d-f fxd-c w-100pr fx-1">
        <div className=" upvotes d-f jc-sb ai-c">
          <div className="d-f ai-c">
            <i className="fas fa-arrow-circle-up mr-"></i>  
            <h1>{x.ups}</h1>
          </div>
          {used &&
            <span className="has-been-used-text">
              <p>Used</p>
            </span>
          }
        </div>
        <p className="subreddit-title mt- mb+ ml- mr-" title={x.title}>{concatTitle(x.title)}</p>
        <p className="author m-- ml- sub-detail"><i className="fas fa-user mr-"></i>{x.author}</p>
        <p className="comments m-- ml- sub-detail"><i className="fas fa-comment-alt mr-"></i> {x.num_comments} Comments</p>
        <p className="publish-tag m-- ml- sub-detail"> <i className="fas fa-history mr-"></i>{dateFns.distanceInWordsToNow(moment.unix(x.created)._d)} ago</p>
        <Flair 
          data={x.link_flair_text}
        />
      </div>
      <div className="reading-info d-f">
        <div className="reading-time">
          <span>{avgReadingTime(x.self_text)}</span>
          min read
        </div>
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

        <a href={x.url} className="btn-link" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-square-alt"></i></a>
        
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