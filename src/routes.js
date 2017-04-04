import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { App, Login, Dashboard } from './containers';
import { requireAuth } from './util';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={requireAuth(Dashboard)} />
    <Route path="/login" component={Login} />
  </Route>
);
