// To use it create some files under `routes/`
// e.g. `server/routes/ember-hamsters.js`
//
// module.exports = function(app) {
//   app.get('/ember-hamsters', function(req, res) {
//     res.send('hello');
//   });
// };

module.exports = function(app, options) {
  var globSync   = require('glob').sync;
  var mocks      = globSync('./mocks/**/*.js', { cwd: __dirname }).map(require);
  var websockets = globSync('./websockets/**/*.js', { cwd: __dirname }).map(require);
  var proxies    = globSync('./proxies/**/*.js', { cwd: __dirname }).map(require);

  // Log proxy requests
  var morgan  = require('morgan');
  app.use(morgan('dev'));

  // mocks.forEach(function(route) { route(app, options); });
  proxies.forEach(function(route) { route(app); });

  var io = require('socket.io').listen(options.httpServer);

  io.on('connection', function(socket) {
    websockets.forEach(function(websocket) { websocket(socket, io); });
  });
};
