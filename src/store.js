import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';
import { reactReduxFirebase } from 'react-redux-firebase'

import { rootReducer, rootInitialState } from './reducers';
import { epicMiddleWare } from './epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true,
});

const router = routerMiddleware(browserHistory);

let config = {
  apiKey: "AIzaSyCsY-GX127EyEcyiKcJv9lUSIqezOJccB0",
  authDomain: "slack-clone-7c87d.firebaseapp.com",
  databaseURL: "https://slack-clone-7c87d.firebaseio.com",
  projectId: "slack-clone-7c87d",
  storageBucket: "slack-clone-7c87d.appspot.com",
  messagingSenderId: "530145985829"
};

export const store = createStore(rootReducer, rootInitialState, composeEnhancers(
  reactReduxFirebase(config, { userProfile: 'users' }),
  applyMiddleware(logger, router, epicMiddleWare)
));
