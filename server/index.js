'use strict';

// To prevent error when requiring .less files in components
require.extensions['.less'] = function () {
  return null;
};

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('bunyan').createLogger({ name: 'playfield:main' });

var apiRoutes = require('./routes/api');
var webRoutes = require('./routes/web');

var app = express();
var development = process.env.NODE_ENV !== 'production';
var config;

try {
  config = require('../local_config.js');
} catch (err) {
  logger.warn('Provide local_config.js. See local_config.example.js.');
}

process.env.API_ORIGIN = config.API_ORIGIN;

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '..', development ? config.DEV_DEST_ROOT : config.DIST_DEST_ROOT), {
  index: false
}));

app.use('/api', apiRoutes(config, development));
app.use('/', webRoutes(config, development));

app.listen(config.NODEJS_PORT, config.NODEJS_ADDR, function () {
  logger.info('Listening for API requests at ' + config.NODEJS_ADDR + ':' + config.NODEJS_PORT);
});
