import React from 'react';
import dateFns from 'date-fns';
import moment from 'moment';

const SubredditPost = ({x, concatTitle}) => {
  return(
    <React.Fragment>
      <div className="d-f fxd-c w-100pr">
        <h1 className=" upvotes">
          <i className="fas fa-arrow-circle-up"></i>  {x.ups}
        </h1>
        <p className="title mt+ mb+ ml- mr-">{concatTitle(x.title)}</p>
        <p className="author m-- ml-"><i className="fas fa-user mr-"></i> Written by {x.author}</p>
        <p className="comments m-- ml-"><i className="fas fa-comment-alt mr-"></i> {x.num_comments} Comments</p>
      </div>
      <div className="d-f ai-c d-f ">
        <p className="publish-tag"> <i className="fas fa-history mr- m-- ml-"></i> published {dateFns.distanceInWordsToNow(moment.unix(x.created_at)._d)} ago</p>
      </div>
      <div className="d-f m- js-fe">
        <a href={x.url} className="link" target="_blank" rel="noopener noreferrer">View</a>

      </div>
    </React.Fragment>
  );
}

export default SubredditPost;