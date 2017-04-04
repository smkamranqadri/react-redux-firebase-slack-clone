import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'

import { AppReducer, appInitialState, LoginReducer, loginInitialState, DashboardReducer, dashboardInitialState  } from './containers';

export const rootInitialState = {
  app: appInitialState,
  login: loginInitialState,
  dashboard: dashboardInitialState
};

export let rootReducer = combineReducers({
  app: AppReducer,
  login: LoginReducer,
  dashboard: DashboardReducer,
  routing: routerReducer
});
