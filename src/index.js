import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import * as firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';

import { store } from './store';
import routes from './routes'

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root')
);


let config = {
  apiKey: "AIzaSyCsY-GX127EyEcyiKcJv9lUSIqezOJccB0",
  authDomain: "slack-clone-7c87d.firebaseapp.com",
  databaseURL: "https://slack-clone-7c87d.firebaseio.com",
  projectId: "slack-clone-7c87d",
  storageBucket: "slack-clone-7c87d.appspot.com",
  messagingSenderId: "530145985829"
};

firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(auth) {
  if (auth) {
    let user = {
      uid: auth.uid,
      displayName: auth.displayName,
      email: auth.email,
      photoURL: auth.photoURL
    };
    store.dispatch({
      type: 'LOGIN_SUCCESS',
      payload: user
    })
  } else {
    // User is signed out.
    // ...
  }
});
