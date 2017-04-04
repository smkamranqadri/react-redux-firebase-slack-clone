import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import * as firebase from 'firebase';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '../node_modules/adminlte-reactjs/public/dist/css/AdminLTE.min.css';
import '../node_modules/adminlte-reactjs/public/dist/css/skins/_all-skins.min.css';

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

// firebase.auth().onAuthStateChanged(function(auth) {
//   if (auth) {
//     let user = {
//       uid: auth.uid,
//       displayName: auth.displayName,
//       email: auth.email,
//       photoURL: auth.photoURL
//     };
//     store.dispatch({
//       type: 'LOGIN_SUCCESS',
//       payload: user
//     })
//   } else {
//     // User is signed out.
//     // ...
//   }
// });
