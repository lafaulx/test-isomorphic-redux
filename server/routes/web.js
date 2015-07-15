'use strict';

var path = require('path');
var express = require('express');
var nunjucks = require('nunjucks');
var logger = require('bunyan').createLogger({ name: 'playfield:web' });
var React = require('react');

require('babel/register')({ stage: 0 });
require('babel/polyfill');

var Router = require('react-router');
var routes = require('../../src/scripts/routes');
var performRouteHandlerStaticMethod = require('../../src/scripts/utils/performRouteHandlerStaticMethod');

var Redux = require('redux');
var ReduxUtils = require('redux/react');
var stores = require('../../src/scripts/stores/index');
var middleware = require('../../src/scripts/middlewares');

var dispatcher = Redux.createDispatcher(
  Redux.composeStores(stores),
  function (getState) {
    return [
      middleware.promiseMiddleware(getState),
      middleware.thunkMiddleware(getState),
      middleware.loggerMiddleware
    ];
  }
);
var redux = Redux.createRedux(dispatcher);

module.exports = function (config, development) {
  var DEST_ROOT = development ? config.DEV_DEST_ROOT : config.DIST_DEST_ROOT;
  var expressRouter = express.Router;
  var web = expressRouter.call(express);

  nunjucks.configure(path.join(__dirname, '../..', DEST_ROOT), {
    tags: {
      blockStart: '<%',
      blockEnd: '%>',
      variableStart: '%%',
      variableEnd: '%%',
      commentStart: '<#',
      commentEnd: '#>'
    }
  });

  web.get('*', function (req, res) {
    if (development) {
      res.set({ 'Access-Control-Allow-Origin': 'http://localhost:' + config.DEV_SERVER_PORT });
    }

    logger.info(req.url);

    var context = {};

    new Promise(function (resolve, reject) {
      var router = Router.create({
        routes: routes,
        location: req.originalUrl,
        onAbort: function (abortReason) {
          reject(abortReason);
        }
      });

      router.run(function (Handler, state) {
        var promises;

        try {
          promises = performRouteHandlerStaticMethod(state.routes, 'fetchData', state, redux);
        } catch (err) {
          reject(err);
          return;
        }

        promises
          .then(function () {
            var providerFactory = React.createFactory(ReduxUtils.Provider);
            var handlerFactory = React.createFactory(Handler);

            var html = React.renderToString(providerFactory({
              redux: redux
            }, function () {
              return handlerFactory({
                params: state.params,
                query: state.query,
                pathname: state.pathname,
                redux: redux
              });
            }));

            context.body = html;

            resolve(html);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    }).then(function () {
      context.appState = JSON.stringify(redux.getState());

      nunjucks.render('index.html', context, function (err, data) {
        if (err) {
          logger.warn({
            error: {
              url: req.url,
              msg: err
            }
          }, 'Render view error');
          res.status(503).send('503');
          return;
        }

        res.send(data);
      });
    }).catch(function (redirect) {
      if (redirect && redirect.to) {
        var newUrl = res.host ? (res.protocol + '//' + res.host + redirect.to) : redirect.to;
        res.redirect(301, newUrl);
      } else {
        logger.warn({
          error: {
            url: req.url,
            msg: redirect.toString()
          }
        }, redirect.stack);

        res.status(503).send('503');
      }
    });

  });

  return web;
};