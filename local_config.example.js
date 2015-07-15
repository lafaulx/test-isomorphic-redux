var NODEJS_ADDR = process.env.NODEJS_ADDR || 'localhost';
var NODEJS_PORT = process.env.NODEJS_PORT || 3000;

module.exports = {
  DEV_DEST_ROOT: '/build/dev',
  DIST_DEST_ROOT: '/build/dist',

  DEV_SERVER_PORT: 4596,

  NODEJS_ADDR: NODEJS_ADDR,
  NODEJS_PORT: NODEJS_PORT,

  API_ORIGIN: 'http://' + NODEJS_ADDR + ':' + NODEJS_PORT
};