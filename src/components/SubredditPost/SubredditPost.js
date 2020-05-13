import React from 'react';
import dateFns from 'date-fns';
import moment from 'moment';
import './SubredditPost.scss';
import '../PostFetchComp/PostFetchComp.scss'
import { inject, observer } from 'mobx-react';
import { getAxios } from '../../api';

const SubredditPost = inject("UserStore", "PostStore")(observer(({x, UserStore, used, onClickHandler, PostStore, key }) => {
  let selectedClass = false

  const _ = PostStore.selectedPosts.find((el) => {
    return el.post_id == x.post_id;
  });

  if ( _ ) {
    selectedClass = true;
  }

  const setViewedOnPost = (post_id) => {
    getAxios({
      url: "/posts/update",
      data: {
        post_id
      },
      method: "put"
    }).then(res => {
      if(res) {
        const clone = [...PostStore.posts]
        const toUpdate = clone.findIndex(x => x.post_id === post_id)
        clone[toUpdate].viewed = true
        PostStore.setPosts(clone)
      }
    })
  }

  return(
    <li 
      className={`d-f fxd-c subreddit-post-parent post animated fadeIn ${selectedClass ? "active-post-select" : ""} ${used ? "has-been-used" : ""} `} 
      data-postid={x.post_id}
      key={key}
    >
      <div className="d-f ai-c subreddit-header">
        <section className="d-f ai-c h-100p">
          <div className={`d-f ai-c upvotes  ${x.viewed ? "post-viewed" : ""}`}>
            <i className="fas fa-arrow-circle-up mr-"></i>  
            <h1>{x.ups}</h1>
          </div>
          <div className="post-upvote-ratio">
            <span className="ratio-thumbs">
              <i className="fas fa-thumbs-up"></i>
              <i className="far fa-thumbs-down"></i>
            </span>
            <p>{x.upvote_ratio * 100}</p>
            <p style={{marginLeft: '-1px'}}>%</p>
          </div>
        </section>
        <section className="d-f ai-c w-100pr h-100p">
          <a href={`https://www.reddit.com/user/${x.author}`} target="_blank" rel="noopener noreferrer" className="fx-1 ai-c td-n td-u-hv">
            <p className="author m-- ml- post-link">
              <i className="fas fa-user mr-"></i>{x.author}
            </p>
          </a>
          {x.link_flair_text &&
            <div className="d-f ai-c h-100p post-flair">
              <p>{x.link_flair_text}</p>
            </div>
          }
        </section>
      </div>
      <div className="subreddit-title-wrapper">
        <a href={x.url} target="_blank" rel="noopener noreferrer" className="td-n td-u-hv " onClick={() => {
          setViewedOnPost(x.post_id)
        }}>
          <p className="subreddit-title post-link" title={x.title}>{concatTitle(x.title)}</p>
        </a>
      </div>
      <div className="subreddit-footer d-f ai-c jc-sb">
        <div className="d-f ai-c">
          <p className="comments ml- sub-detail">
            <i className="fas fa-comment-alt mr-"></i> 
            {x.num_comments} Comments
          </p>
          <p className="publish-tag ml- sub-detail"> 
            <i className="fas fa-history mr-"></i>
            {dateFns.distanceInWordsToNow(moment.unix(x.created)._d)} ago
          </p>
          <p className="subreddit-treading-time sub-detail ml-">
            <i className="fas fa-book-reader mr-"></i>
            ~{x.readTime} min read
          </p>
        </div>

        <div className="d-f ai-c">
          {x.viewed &&
            <div className="subreddit-viewed info mr-" title="Viewed">
              <i className="far fa-eye"></i>
            </div>
          }
          {used &&
            <div className="has-been-used-text mr- info" title="Saved in database">
              <i class="fas fa-cloud"></i>
            </div>
          }
          {UserStore.getUser() &&
            <button className="btn btn-select" onClick={() => {
              onClickHandler(x);
            }}
            >
              <i className="fas fa-check"></i>
            </button>
          }
        </div>
      </div>
    </li>
  );
}));

const concatTitle = title => {
  const str = title.length < 70 ? title : title.slice(0,70) + "...";
  return str; 
}
export default SubredditPost;

{/* <div className="d-f fxd-c w-100pr fx-1">
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
              <p>{x.upvote_ratio * 100}</p>
              <p style={{marginLeft: '-1px'}}>%</p>
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
          <span>~{x.readTime} </span>
          min read
        </div>
      </div>
        <Flair 
          data={x.link_flair_text}
        />
      </div>
      
      <div className="d-f m- jc-sb post-actions">
        <div className="d-f ai-c">
          {UserStore.getUser() &&
            <button className="btn btn-select" onClick={() => {
              onClickHandler(x);
            }}
            >
              <i className="fas fa-check"></i>
            </button>
          }
          {x.viewed &&
            <i className="far fa-eye ml-" style={{
              color: '#ff7e5f'
            }}></i>
          }
        </div>

        <a href={x.url} className="btn-link" target="_blank" rel="noopener noreferrer"  onClick={() => {
          setViewedOnPost(x.post_id)
        }}><i className="fas fa-external-link-square-alt"></i></a>
        
      </div> */}