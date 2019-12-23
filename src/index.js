import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LogRocket from 'logrocket';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import About from './Pages/About/About';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import {ToastContainer} from 'react-toastify';
import UserStore from './stores/UserStore';
import ModalStore from './stores/ModalStore';
import SubredditStore from './stores/SubredditStore';
import PostStore from './stores/PostStore';
import InboxStore from './stores/InboxStore';
import ReadingListStore from './stores/ReadingListStore';
import 'react-toastify/dist/ReactToastify.css';
import { renewRefreshToken } from './helpers/renewRefreshToken';
import db from './Database/Database';
import { Provider } from 'mobx-react';
import Overview from './Pages/Dashboard/Overview/Overview';
import ReadingList from './Pages/Dashboard/ReadingList/ReadingList';
import Inbox from './Pages/Dashboard/Inbox/Inbox';
import Approval from './Pages/Approval/Approval';
import { ContactsPage } from './Pages/ContactsPage/ContactsPage';
import Static from './Webbuilder/Static/Static'
import SiteIndex from './Webbuilder/Dashboard/Settings/SiteIndex';
import SiteStore from './stores/SiteStore';

if ( process.env.NODE_ENV !== "development") LogRocket.init('kstoxh/reddex');

const PrivateRoute = ({ component: Component, ...rest }) => {
  let token = window.localStorage.getItem('token');
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

const stores = {
  UserStore,
  ModalStore,
  SubredditStore,
  PostStore,
  InboxStore,
  ReadingListStore,
  SiteStore
}

const InitalLoad = () => { 
  const [ loaded, setLoaded ] = useState(false);
  const profile = JSON.parse(window.localStorage.getItem("reddit_profile"))
  const token = window.localStorage.getItem("token");

  useEffect(() => {
    const _ = async () => {
      if ( token ) {
        await stores.UserStore.setUser()
      }
      if (profile) {
        await stores.UserStore.setRedditProfile(profile);
      }
      setLoaded(true);
    }

    _();
  }, [])

  if ( loaded ) {
    const subdomain = window.location.host.split('.');
    if ( subdomain.length > 1 ) {
      return(
        <Router>
          <Switch>
            <Route exact path="/" component={Static}/>
          </Switch>
        </Router>
      )
    } else {
      return(
        <Provider {...stores}>
          <Router>  
            <ToastContainer />
            <Switch>
              <Route exact path="/" component={App}/>
              {/* <Route exact path="/about" component={About} /> */}
              <Route exact path="/signup" component={SignupPage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/approval" component={Approval}/>
              <PrivateRoute exact path="/account/:account_subpage" component={AccountPage}/>
              <PrivateRoute exact path="/dashboard/home" component={Overview}/>
              <PrivateRoute exact path="/dashboard/inbox" component={Inbox}/>
              <PrivateRoute exact path="/dashboard/reading_list" component={ReadingList} />
              <PrivateRoute exact path="/dashboard/contacts" component={ContactsPage} />
              <PrivateRoute exact path="/dashboard/site" component={SiteIndex} />
            </Switch>
          </Router>
        </Provider>
      );
    }
  } else {
    return null
  }
}

ReactDOM.render(
  <InitalLoad />
  , document.getElementById('root'),() => window.localStorage.getItem("token") ? renewRefreshToken() : null);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
