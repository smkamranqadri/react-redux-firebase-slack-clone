import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router';

import { rootReducer, rootInitialState } from './reducers';
import { epicMiddleWare } from './epics';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger({
  collapsed: true,
});

const router = routerMiddleware(browserHistory)

export const store = createStore(rootReducer, rootInitialState, composeEnhancers(
  applyMiddleware(logger, router, epicMiddleWare)
));
