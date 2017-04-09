import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic, DashboardEpic } from './containers';

const epics = combineEpics(
  LoginEpic.loginWithGoogle,
  LoginEpic.updateProfile,
  LoginEpic.checkLogin,
  DashboardEpic.addChannel,
  DashboardEpic.getActiveChannelConversations,
  DashboardEpic.sendMessage
);

export const epicMiddleWare = createEpicMiddleware(epics);
