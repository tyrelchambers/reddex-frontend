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
});


export default db;