module.exports = makeJade;

function makeJade(root) {
  return function(request, response, next) {
    var path = require('path');
    var fs = require('fs');
    var jade = require('jade');
    var requestURL = request.url == "/" ? root + "/index.html" : request.url;

    if (path.extname(request.url) == ".jade") {
      response.statusCode = 404;
      response.end();
    } else if (path.extname(requestURL) == ".html") {      
      var htmlFile = root + "/" + requestURL;
      fs.readFile(htmlFile, {encoding: "utf8"}, function(err, data) {
        if (!err) {
          // return .html
          response.setHeader("Content-Length", data.length);
          response.setHeader("Content-Type", "text/html; charset=UTF-8");
          response.end(data);
          return;
        }
        var jadeFile = root + "/" + path.basename(requestURL, ".html") + ".jade";
        fs.readFile(jadeFile, {encoding: "utf8"}, function(err, data) {
          if (!err) {
            // compile .jade
            jade.render(data, {}, function(err, html) {
              response.setHeader("Content-Length", html.length);
              response.setHeader("Content-Type", "text/html; charset=UTF-8");
              response.end(html);
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
