import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LogRocket from 'logrocket';
import Dexie from 'dexie';

if ( process.env.NODE_ENV !== "development") LogRocket.init('kstoxh/reddex');

const db = new Dexie("Reddex");
window.db = db;
db.version(1).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created_at"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
