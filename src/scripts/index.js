import React from 'react';
import Router from 'react-router';

import routes from './routes';
import performRouteHandlerStaticMethod from './utils/performRouteHandlerStaticMethod';

require('../styles/base');

import { createDispatcher, composeStores, createRedux } from 'redux';
import { Provider } from 'redux/react';
import * as stores from './stores/index';
import { thunkMiddleware, promiseMiddleware, loggerMiddleware } from './middlewares';

const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [promiseMiddleware(getState), thunkMiddleware(getState), loggerMiddleware]
);

const redux = createRedux(dispatcher, window.appState || {});

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  const promise = performRouteHandlerStaticMethod(state.routes, 'fetchData', state, redux);
  const props = {
    params: state.params,
    query: state.query,
    pathname: state.pathname,
    redux: redux
  };

  const appEl = window.document.getElementById('app');

  promise.then(() => {
    return React.render(
      <Provider redux={redux}>
        {() =>
          <Handler {...props} />
        }
      </Provider>,
      appEl
    );
  });
});
