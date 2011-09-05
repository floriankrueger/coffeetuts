(function() {
  var http, spawn;
  http = require('http');
  spawn = require('child_process').spawn;
  http.createServer(function(request, response) {
    var tail_child;
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    tail_child = spawn('tail', ['-f', '/var/log/system.log']);
    request.connection.on('end', function() {
      return tail_child.kill();
    });
    return tail_child.stdout.on('data', function(data) {
      console.log(data.toString());
      return response.write(data);
    });
  }).listen(4000);
}).call(this);
