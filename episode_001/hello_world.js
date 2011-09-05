(function() {
  var http;
  http = require('http');
  http.createServer(function(request, response) {
    console.log('new request');
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    return response.end('Hello World');
  }).listen(4000);
}).call(this);
