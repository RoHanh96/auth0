var app = require('./app.js');
var debug = require('debug')('nodejs-regular-webapp2:server');

var http = require('http');
var port = '3000';
app.set('port', port);
var server = http.createServer(app);
server.listen(port);
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}

