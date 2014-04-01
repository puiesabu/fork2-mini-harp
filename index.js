var connect = require('connect');
var serveStatic = require('serve-static');
var makeJade = require('./lib/processor/jade');
var makeLess = require('./lib/processor/less');

module.exports = function(root) {
  var app = connect();

  app.use(function(request, response, next) {
    if (request.url == "/current-time") {
      response.end((new Date()).toISOString());
    } else {
      next();
    }
  })
    .use(makeJade(root))
    .use(makeLess(root))
    .use(serveStatic(root));

  return app;
}
