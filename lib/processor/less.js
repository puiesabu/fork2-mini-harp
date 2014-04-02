module.exports = makeLess;

function makeLess(root) {
  return function(request, response, next) {
    var path = require('path');
    var fs = require('fs');
    var less = require('less');

    if (path.extname(request.url) == ".less") {
      response.statusCode = 404;
      response.end();
    } else if (path.extname(request.url) == ".css") {
      var cssFile = root + "/" + request.url;
      fs.readFile(cssFile, {encoding: "utf8"}, function(err, data) {
        if (!err) {
          // return .css
          response.setHeader("Content-Length", data.length);
          response.setHeader("Content-Type", "text/css; charset=UTF-8");
          response.end(data);
          return;
        }
        var lessFile = root + "/" + path.basename(request.url, ".css") + ".less";
        fs.readFile(lessFile, {encoding: "utf8"}, function(err, data) {
          if (!err) {
            // compile .less
            less.render(data, function(err, css) {
              response.setHeader("Content-Length", css.length);
              response.setHeader("Content-Type", "text/css; charset=UTF-8");
              response.end(css);
            });
            return;  
          }

          // 404
          next();
        });
      });
    } else {
      next();
    }
  }
}
