'use strict';

var express = require('express');
var logger = require('bunyan').createLogger({ name: 'playfield:api' });

var games = [{
  id: 0,
  name: 'Bloodborne'
}, {
  id: 1,
  name: 'Mortal Kombat'
}];

module.exports = function (config, development) {
  var api = express.Router();

  api.all('/*', function (req, res, next) {
    res.set({
      'Access-Control-Allow-Headers': 'X-Requested-With',
      'Cache-Control': 'public, s-maxage=60',
      'Content-Type': 'application/json',
      'Expires': (new Date(Date.now() + 60 * 1000).toUTCString())
    });

    logger.info(req.url);

    if (development) {
      res.set({ 'Access-Control-Allow-Origin': 'http://' + config.DEV_SERVER_HOST });
    }

    next();
  });

  api.get('/games', function(req, res) {
    res.send(games);
  });

  return api;
};