import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, DashboardEpic } from './containers';

const epics = combineEpics(
  LoginEpic.loginWithGoogle,
  LoginEpic.updateProfile,
  LoginEpic.checkLogin,
  DashboardEpic.addChannel
);

export const epicMiddleWare = createEpicMiddleware(epics);
