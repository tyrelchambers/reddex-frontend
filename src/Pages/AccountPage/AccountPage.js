import React, {useContext, useState, useEffect} from 'react'
import { observer } from 'mobx-react-lite';
import UserStore from '../../stores/UserStore';
import firebase from 'firebase';

import './AccountPage.scss';

const AccountPage = observer(() => {
  const store = useContext(UserStore);
  const [ defaultMessage, setDefaultMessage ] = useState("");

  useEffect(() => {
    getUserProfile(store.getUser().uid);
  })
  return (
    <div className="d-f fxd-c jc-c ai-c w-100pr h-100v">
      <div className="wrapper d-f fxd-c ai-c">
        <h1>Account</h1>
        <h4 className="mt+">Your registered email: {store.getUser().email}</h4>

        <section className="default-message mt+">
          <div className="current-message mt+ mb+">
            <h4 className="form-label">Your current default message</h4>
            <p id="defaultMessageHolder"></p>
          </div>
          <form className="d-f fxd-c ai-fs">
            <div className="field-group">
              <label htmlFor="defaultMessage" className="form-label">Your Default Message</label>
              <textarea name="defaultMessage" className="default-message-input" id="defaultMessage" placeholder="Enter default message.." onChange={e => setDefaultMessage(e.target.value)}></textarea>
            </div>
            
            <div className="d-f jc-sb ai-c w-100pr">
              <p>From: Stories After Midnight</p>

              <button className="btn btn-secondary" onClick={(e) => saveMessageHandler(e, defaultMessage, store.getUser().uid)}>Save Message</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  )
});

const getUserProfile = (uid) => {
  const db = firebase.firestore();
  const dfMsg = document.querySelector("#defaultMessageHolder");
  
  const profile = db.collection("users").doc(uid).get().then((doc) => {
    if (doc.exists) {
      dfMsg.innerHTML = doc.data().defaultMessage;
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
  })
  .catch(function(error) {
    console.log("Error getting document:", error);
  });

  return profile
}

const saveMessageHandler = (e, msg, userId) => {
  e.preventDefault();
  const db = firebase.firestore();

  db.collection('users').doc(userId).set({
    defaultMessage: msg
  })
  .then(() => {
    window.location.reload(true);
  });
}

export default AccountPage;