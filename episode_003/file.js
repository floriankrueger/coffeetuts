(function() {
  var file_path, fs, http, sys;
  http = require('http');
  fs = require('fs');
  sys = require('sys');
  file_path = __dirname + '/cat.jpg';
  fs.stat(file_path, function(err, stat) {
    if (err) {
      throw err;
    }
    return http.createServer(function(request, response) {
      var rs;
      response.writeHead(200, {
        'Content-Type': 'image/jpeg',
        'Content-Length': stat.size
      });
      rs = fs.createReadStream(file_path);
      return sys.pump(rs, response, function(err) {
        if (err) {
          throw err;
        }
      });
    }).listen(4000);
  });
}).call(this);
