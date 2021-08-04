import React, { useEffect, useState } from "react";
import dateFns from "date-fns";
import moment from "moment";
import "./SubredditPost.scss";
import "../SubredditSearch/SubredditSearch.scss";
import { inject, observer } from "mobx-react";
import { setPostIsViewed } from "../../api/setPostIsViewed";

const SubredditPost = inject(
  "UserStore",
  "PostStore"
)(
  observer(({ x, UserStore, PostStore, usedPosts }) => {
    const [isUsed, setIsUsed] = useState(false);

    let selectedClass = false;

    useEffect(() => {
      if (usedPosts) {
        for (let i = 0; i < usedPosts.length; i++) {
          if (usedPosts[i].post_id === x.post_id) {
            setIsUsed(true);
          }
        }
      }
    }, [usedPosts]);

    const isSelected = PostStore.selectedPosts.find((el) => {
      return el.post_id === x.post_id;
    });

    if (isSelected) {
      selectedClass = true;
    }

    return (
      <li
        className={`flex flex-col subreddit-post-parent post rounded-lg shadow-md ${
          selectedClass ? "active-post-select" : ""
        } ${isUsed ? "has-been-used" : ""} `}
        data-postid={x.post_id}
      >
        <div className="flex items-center subreddit-header">
          <section className="flex items-center h-full">
            <div
              className={`flex items-center upvotes  ${
                x.viewed ? "post-viewed" : ""
              }`}
            >
              <i className="fas fa-arrow-circle-up mr-2"></i>
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
          <section className="flex items-center w-full h-full flex-wrap gap-2">
            <a
              href={`https://www.reddit.com/user/${x.author}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 items-center no-underline  truncate"
            >
              <p className="author  ml-2 post-link truncate">
                <i className="fas fa-user mr-2"></i>
                {x.author}
              </p>
            </a>
            {x.link_flair_text && (
              <div className="flex items-center h-full post-flair">
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
            className="no-underline"
            onClick={() => {
              setPostIsViewed(x.post_id);
            }}
          >
            <p className="subreddit-title post-link" title={x.title}>
              {x.title}
            </p>
          </a>
        </div>
        <div className="subreddit-footer flex items-center justify-between">
          <div className="flex items-center">
            <p className="comments ml-2 sub-detail">
              <i className="fas fa-comment-alt mr-2"></i>
              {x.num_comments} Comments
            </p>
            <p className="publish-tag ml-2 sub-detail">
              <i className="fas fa-history mr-2"></i>
              {dateFns.distanceInWordsToNow(moment.unix(x.created)._d)} ago
            </p>
            <p className="subreddit-reading-time sub-detail ml-2">
              <i className="fas fa-book-reader mr-2"></i>~{x.readTime} min read
            </p>
          </div>

          <div className="flex items-center">
            {x.viewed && (
              <div className="subreddit-viewed info mr-2" title="Viewed">
                <i className="far fa-eye"></i>
              </div>
            )}
            {isUsed && (
              <div
                className="has-been-used-text mr-2 info"
                title="This author has been contacted"
              >
                <i className="fas fa-user-check"></i>
              </div>
            )}
            {UserStore.getUser() && (
              <button
                className="btn btn-select"
                onClick={() => {
                  PostStore.setSelectedPosts(x);
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
