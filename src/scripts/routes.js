import React from 'react';
import { Route } from 'react-router';

import AppHandler from './handlers/AppHandler';
import ListHandler from './handlers/ListHandler';

export default (
  <Route name='root' handler={AppHandler}>
    <Route name='list' path='/' handler={ListHandler} />
  </Route>
);
