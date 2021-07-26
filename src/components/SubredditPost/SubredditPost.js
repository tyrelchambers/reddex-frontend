import React from "react";
import dateFns from "date-fns";
import moment from "moment";
import "./SubredditPost.scss";
import "../SubredditSearch/SubredditSearch.scss";
import { inject, observer } from "mobx-react";
import { getAxios } from "../../api";

const SubredditPost = inject(
  "UserStore",
  "PostStore"
)(
  observer(({ x, UserStore, used, onClickHandler, PostStore, key }) => {
    let selectedClass = false;

    const _ = PostStore.selectedPosts.find((el) => {
      return el.post_id === x.post_id;
    });

    if (_) {
      selectedClass = true;
    }

    const setViewedOnPost = (post_id) => {
      getAxios({
        url: "/posts/update",
        data: {
          post_id,
        },
        method: "put",
      }).then((res) => {
        if (res) {
          const clone = [...PostStore.posts];
          const toUpdate = clone.findIndex((x) => x.post_id === post_id);
          clone[toUpdate].viewed = true;
          PostStore.setPosts(clone);
        }
      });
    };

    return (
      <li
        className={`d-f fxd-c subreddit-post-parent post animated fadeIn ${
          selectedClass ? "active-post-select" : ""
        } ${used ? "has-been-used" : ""} `}
        data-postid={x.post_id}
        key={key}
      >
        <div className="d-f ai-c subreddit-header">
          <section className="d-f ai-c h-100p">
            <div
              className={`d-f ai-c upvotes  ${x.viewed ? "post-viewed" : ""}`}
            >
              <i className="fas fa-arrow-circle-up mr-"></i>
              <p className="font-bold text-2xl text-white">{x.ups}</p>
            </div>
            <div className="post-upvote-ratio">
              <span className="ratio-thumbs">
                <i className="fas fa-thumbs-up"></i>
                <i className="far fa-thumbs-down"></i>
              </span>
              <p>{x.upvote_ratio * 100}</p>
              <p style={{ marginLeft: "-1px" }}>%</p>
            </div>
          </section>
          <section className="d-f ai-c w-100pr h-100p">
            <a
              href={`https://www.reddit.com/user/${x.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fx-1 ai-c td-n td-u-hv"
            >
              <p className="author m-- ml- post-link">
                <i className="fas fa-user mr-"></i>
                {x.author}
              </p>
            </a>
            {x.link_flair_text && (
              <div className="d-f ai-c h-100p post-flair">
                <p>{x.link_flair_text}</p>
              </div>
            )}
          </section>
        </div>
        <div className="subreddit-title-wrapper">
          <a
            href={x.url}
            target="_blank"
            rel="noopener noreferrer"
            className="td-n td-u-hv "
            onClick={() => {
              setViewedOnPost(x.post_id);
            }}
          >
            <p className="subreddit-title post-link" title={x.title}>
              {x.title}
            </p>
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
            <p className="subreddit-reading-time sub-detail ml-">
              <i className="fas fa-book-reader mr-"></i>~{x.readTime} min read
            </p>
          </div>

          <div className="d-f ai-c">
            {x.viewed && (
              <div className="subreddit-viewed info mr-" title="Viewed">
                <i className="far fa-eye"></i>
              </div>
            )}
            {used && (
              <div
                className="has-been-used-text mr- info"
                title="Saved in database"
              >
                <i class="fas fa-cloud"></i>
              </div>
            )}
            {UserStore.getUser() && (
              <button
                className="btn btn-select"
                onClick={() => {
                  onClickHandler(x);
                }}
              >
                <i className="fas fa-check"></i>
              </button>
            )}
          </div>
        </div>
      </li>
    );
  })
);

export default SubredditPost;
