import React from 'react';
import dateFns from 'date-fns';
import moment from 'moment';
import './SubredditPost.scss';
const SubredditPost = ({x}) => {
  
  return(
    <React.Fragment>
      <div className="d-f fxd-c w-100pr fx-1">
        <h1 className=" upvotes">
          <i className="fas fa-arrow-circle-up"></i>  {x.ups}
        </h1>
        <p className="title mt+ mb+ ml- mr-">{concatTitle(x.title)}</p>
        <p className="author m-- ml-"><i className="fas fa-user mr-"></i>{x.author}</p>
        <p className="comments m-- ml-"><i className="fas fa-comment-alt mr-"></i> {x.num_comments} Comments</p>
        <p className="publish-tag"> <i className="fas fa-history mr- m-- ml-"></i> published {dateFns.distanceInWordsToNow(moment.unix(x.created)._d)} ago</p>

      </div>

      <div className="d-f m- jc-fe post-actions">
        <a href={x.url} className="link" target="_blank" rel="noopener noreferrer"><i className="fas fa-external-link-square-alt"></i></a>
        
      </div>
    </React.Fragment>
  );
}

const concatTitle = title => {
  const str = title.length < 70 ? title : title.slice(0,70) + "...";
  return str; 
}
export default SubredditPost;