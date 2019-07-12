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

export default db;