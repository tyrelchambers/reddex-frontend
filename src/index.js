import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
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
import db from './Database/Database';
import { Provider } from 'mobx-react';
import Overview from './Pages/Dashboard/Overview/Overview';
import ReadingList from './Pages/Dashboard/ReadingList/ReadingList';
import Inbox from './Pages/Dashboard/Inbox/Inbox';
import { ContactsPage } from './Pages/ContactsPage/ContactsPage';
import Static from './Webbuilder/Static/Static'
import SiteIndex from './Webbuilder/Dashboard/SiteIndex/SiteIndex';
import SiteStore from './stores/SiteStore';
import PricingPage from './Pages/PricingPage/PricingPage';
import ResetPasswordConfirm from './Pages/ResetPasswordConfirm/ResetPasswordConfirm';
import ResetPassword from './Pages/ResetPassword/ResetPassword';
import HelpPage from './Pages/HelpPage/HelpPage';
import { checkValidTokens } from './helpers/checkValidTokens';
import LogRocket from 'logrocket';
import Page404 from './Pages/Misc/404';
import { getCurrentAuthenticatedUser } from './helpers/renewRefreshToken';
import { getAxios } from './api/index';
import StorySubmission from './Webbuilder/Static/StorySubmission/StorySubmission';
import FormStore from './stores/FormStore'
import SubmittedStories from './Pages/SubmittedStories/SubmittedStories';
import Story from './Pages/Story/Story';
import Authorize from './Pages/Authorize/Authorize';
if ( process.env.NODE_ENV !== 'development' ) LogRocket.init('kstoxh/reddex');
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
  SiteStore,
  FormStore
}


const subdomain = window.location.host.split('.');

const InitialSubLoad = () => {
  const [ loaded, setLoaded ] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === "dark") {
      document.querySelector("body").classList.add('theme-dark')
    } else {
      document.querySelector("body").classList.add('theme-light')
    }
  }, [localStorage.getItem('theme')])

  useEffect(() => {
    const subdomain = window.location.host.split('.')[0];
    const fn = async () => {
      await getAxios({
        url: '/site/',
        params: {
          subdomain
        }
      }).then(res => {
        if (res) {
          stores.SiteStore.setConfig(res);
          setLoaded(true)
        }
      })
      
    }
    fn();
  }, []);

  if (loaded) {
    return(
      <Provider {...stores}>
        <ToastContainer />
  
        <Router>
          <Switch>
            <Route exact path="/" component={Static}/>
            <Route exact path="/submit" component={StorySubmission}/>
            <Route component={Page404}/>
  
          </Switch>
        </Router>
      </Provider>
    )
  } else {
    return null; 
  }
}

const InitialLoad = () => { 
  const [ loaded, setLoaded ] = useState(false);
  const token = window.localStorage.getItem("token");
  const redditProfile = window.localStorage.getItem('reddit_profile')
  
  useEffect(() => {
    if (localStorage.getItem('theme') === "dark") {
      document.querySelector("body").classList.add('theme-dark')
    } else {
      document.querySelector("body").classList.add('theme-light')
    }
  }, [localStorage.getItem('theme')])

  useEffect(() => {
    const _ = async () => {
      
      if ( token ) {
        await stores.UserStore.setUser()
        await checkValidTokens()
        const user = stores.UserStore.getUser();
        stores.UserStore.setRedditProfile(user.reddit_profile)

        if ((redditProfile && !user.reddit_profile) || (!redditProfile && !user.reddit_profile)) {
          const profile = await getCurrentAuthenticatedUser(user.access_token)
          if (profile) {
            await getAxios({
              url: '/profile/reddit_profile',
              method: 'post',
              data: profile
            }).then(res => {
              stores.UserStore.setRedditProfile(res.reddit_profile)
              window.localStorage.removeItem('reddit_profile')
            })
          }
        }
      }
      setLoaded(true);
    }

    _();
    
  }, [])

  if ( loaded ) {

    return(
      <Provider {...stores}>
        <Router>  
          <ToastContainer />
          <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/about" component={About} />
            <Route exact path="/signup" component={SignupPage} />
            <Route exact path="/signout" render={() => {
              UserStore.signOut();
              window.location.pathname = "/"
            }} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/reset" component={ResetPassword} />
            <Route exact path="/request-reset" component={ResetPasswordConfirm} />
            <Route exact path="/help" component={HelpPage} />
            <Route exact path="/authorize" component={Authorize} />
            {/* <Route exact path="/pricing" component={PricingPage} /> */}
            <PrivateRoute exact path="/dashboard/account" component={AccountPage}/>
            <PrivateRoute exact path="/dashboard/home" component={Overview}/>
            <PrivateRoute exact path="/dashboard/inbox" component={Inbox}/>
            <PrivateRoute exact path="/dashboard/reading_list" component={ReadingList} />
            <PrivateRoute exact path="/dashboard/contacts" component={ContactsPage} />
            <PrivateRoute exact path="/dashboard/site" component={SiteIndex} />
            <PrivateRoute exact path="/dashboard/submitted" component={SubmittedStories} />
            <PrivateRoute path="/dashboard/story/:id" component={Story} />
            <Route component={Page404}/>
          </Switch>
        </Router>
      </Provider>
    );
    
  } else {
    return null
  }
}

const Index = () => {
  if ((subdomain.length > 2 && subdomain[0] !== "development") || (subdomain.length > 1  && subdomain.includes("localhost:3000"))) {
    return <InitialSubLoad />
  } else {
    return <InitialLoad />
  }
}
ReactDOM.render(
  <Index />
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
