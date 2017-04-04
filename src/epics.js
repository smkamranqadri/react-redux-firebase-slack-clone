import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { LoginEpic } from './containers';

const epics = combineEpics(
  LoginEpic.loginWithGoogle,
  LoginEpic.updateProfile
);

export const epicMiddleWare = createEpicMiddleware(epics);
