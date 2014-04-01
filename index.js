var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');

module.exports = function(root) {
  var app = connect();

  app.use(function(request, response, next) {
    if (request.url == "/current-time") {
      response.end((new Date()).toISOString());
    } else {
      next();
    }
  })
  	.use(serveStatic(root))
  	.use(makeJade(root));

  return app;
}
