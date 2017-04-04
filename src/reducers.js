import { combineReducers } from 'redux';

import app, { appInitialState } from './containers/app/app.reducer';

export const rootInitialState = {
  app: appInitialState,
};

export default combineReducers({
  app,
});
