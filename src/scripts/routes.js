import React from 'react';
import { Route } from 'react-router';

import AppHandler from './handlers/AppHandler';
import ListHandler from './handlers/ListHandler';
import ViewHandler from './handlers/ViewHandler';
import CreateHandler from './handlers/CreateHandler';

export default (
  <Route name='root' handler={AppHandler}>
    <Route name='list' path='/' handler={ListHandler} />
    <Route name='game' path='/view/:id' handler={ViewHandler} />
    <Route name='create' path='/create' handler={CreateHandler} />
  </Route>
);
