import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LogRocket from 'logrocket';
import Dexie from 'dexie';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './layouts/Header/Header';
import About from './Pages/About/About';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import firebase from './stores/FireStore';
import Axios from 'axios';


if ( process.env.NODE_ENV !== "development") LogRocket.init('kstoxh/reddex');

const db = new Dexie("Reddex");

window.db = db;
db.version(1).stores({
  posts: "++id, author, title, selftext, ups, url, num_comments, created"
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = false;
  return (
    <Route
    {...rest}
    render={props =>
      token ? (
        <Component {...props} />
        ) : (
          <React.Fragment>
            <Redirect
              to={{
                pathname: "/signup",
                state: { from: props.location }
              }}
              />
          </React.Fragment>   
        )
      }
    />
  );
}

const renewRefreshToken = async () => {
  const encode = window.btoa(`${process.env.REACT_APP_REDDIT_APP_NAME}:${process.env.REACT_APP_REDDIT_APP_SECRET}`);
  const token = JSON.parse(window.localStorage.getItem('reddit_tokens'));

  if ( !token.access_token ) return null;

  await Axios.post('https://www.reddit.com/api/v1/access_token', 
    `grant_type=refresh_token&refresh_token=${token.refresh_token}`
  ,
  {
    headers: {
      "Authorization": `Basic ${encode}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(res => {
    window.localStorage.setItem('reddit_tokens', JSON.stringify({
      ...token,
      access_token: res.data.access_token
    }));
    getCurrentAuthenticatedUser(res.data.access_token);
  })
  .catch(console.log);
}

// called in renewRefreshToken
const getCurrentAuthenticatedUser = (token) => {

  Axios.get('https://oauth.reddit.com/api/v1/me', {
    headers: {
      "Authorization": `bearer ${token}`
    }
  })
  .then(res => window.localStorage.setItem('reddit_profile', JSON.stringify(res.data)))
  .catch(console.log);
}

ReactDOM.render(
  <Router>  
    <Header />
    <Switch>
      <Route exact path="/" component={App}/>
      <Route exact path="/about" component={About} />
      <Route exact path="/signup" component={SignupPage} />
      <Route exact path="/login" component={LoginPage} />
      <Route exact path="/account" component={AccountPage} />
    </Switch>
      
  </Router>, document.getElementById('root'),() => renewRefreshToken());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
