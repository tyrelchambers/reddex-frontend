import React, { useContext, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import LogRocket from 'logrocket';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Header from './layouts/Header/Header';
import About from './Pages/About/About';
import SignupPage from './Pages/SignupPage/SignupPage';
import LoginPage from './Pages/LoginPage/LoginPage';
import AccountPage from './Pages/AccountPage/AccountPage';
import firebase from './stores/FireStore';
import {ToastContainer} from 'react-toastify';
import UserStore from './stores/UserStore';
import 'react-toastify/dist/ReactToastify.css';
import { getSubreddits } from './helpers/getSubreddits';
import { renewRefreshToken } from './helpers/renewRefreshToken';
import AppLoader from './components/Loading/AppLoader';
import db from './Database/Database';
import NewVisitor from './components/NewVisitor/NewVisitor';

if ( process.env.NODE_ENV !== "development") LogRocket.init('kstoxh/reddex');



const PrivateRoute = ({ component: Component, ...rest }) => {
  const userStore = useContext(UserStore);
  let token = (userStore.getUser());
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


const InitalLoad = () => {

  return(
    <Router>  
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/about" component={About} />
        <Route exact path="/signup" component={SignupPage} />
        <Route exact path="/login" component={LoginPage} />
        <PrivateRoute exact path="/account" component={AccountPage} />
      </Switch>
        
    </Router>
  );
}

ReactDOM.render(
  <InitalLoad />
  , document.getElementById('root'),() => renewRefreshToken());

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
