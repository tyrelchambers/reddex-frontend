import Dexie from 'dexie';

const db = new Dexie("Reddex");

window.db = db;
db.version(1).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created"
});

db.version(2).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created",
  authors: "++id, author",
  subreddits: "++id, subreddit"
});

db.version(3).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created, flair",
  authors: "++id, author",
  subreddits: "++id, subreddit"
});

db.version(4).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created, flair, postId",
  authors: "++id, author",
  subreddits: "++id, subreddit"
});

db.version(5).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created, flair, postId, subreddit",
  authors: "++id, author",
  subreddits: "++id, subreddit"
});

db.version(6).stores({
  posts: "++id, author, title, self_text, ups, url, num_comments, created, flair, post_id, subreddit",
  authors: "++id, author",
  subreddits: "++id, subreddit"
}).upgrade(tx => {
  return tx.posts.toCollection().modify(item => {
    item.self_text = item.selftext;
    item.post_id = item.postId;
    delete item.postId;
    delete item.selftext;
  })
});

db.version(7).stores({
  posts: "++id, author, title, self_text, ups, url, num_comments, created, flair, post_id, subreddit",
  authors: "++id, author"
})

db.version(8).stores({
  posts: "++id, author, title, self_text, ups, url, num_comments, created, flair, post_id, subreddit, upvote_ratio, viewed",
  authors: "++id, author"
})

const upgradeItems = async () => {
   db.posts.toCollection().first().then(x => {
    if ( !x ) {
      return
    } else {
      if (x.hasOwnProperty("selftext") && x.hasOwnProperty("postId")) {
        db.posts.toCollection().modify(item => {
          item.self_text = item.selftext;
          item.post_id = item.postId;
          delete item.postId;
          delete item.selftext;
        })
      }
    }
  });  
}

if ((db.verno === 5 || db.verno === 6)) {
  
  upgradeItems()
}

export default db;
