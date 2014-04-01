module.exports = makeJade;

function makeJade(root) {
  return function(request, response, next) {
    var path = require('path');
    var fs = require('fs');
    var jade = require('jade');

    if (path.extname(request.url) == ".html") {
      var htmlFile = root + "/" + request.url;
      fs.readFile(htmlFile, {encoding: "utf8"}, function(err, data) {
        if (!err) {
          // return .html
          response.end(data);
          return;
        }
        var jadeFile = root + "/" + path.basename(request.url, ".html") + ".jade";
        fs.readFile(jadeFile, {encoding: "utf8"}, function(err, data) {
          if (!err) {
            // return .jade
            jade.render(data, {}, function(err, html) {
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
