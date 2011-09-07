(function() {
  var clients, fs, http, sys, ws;
  http = require('http');
  fs = require('fs');
  sys = require('sys');
  ws = require('./ws.js');
  clients = [];
  http.createServer(function(request, response) {
    var rs;
    response.writeHead(200, {
      'Content-Type': 'text/html'
    });
    rs = fs.createReadStream(__dirname + '/template.html');
    return sys.pump(rs, response);
  }).listen(4000);
  ws.createServer(function(websocket) {
    var username;
    username = null;
    websocket.on('connect', function(resource) {
      clients.push(websocket);
      websocket.write('Welcome to this chat server!');
      return websocket.write("Please provide your user name");
    });
    websocket.on('data', function(data) {
      var feedback;
      if (!username) {
        username = data.toString();
        websocket.write("welcome, " + username + "!");
        return;
      }
      feedback = "" + username + ": " + (data.toString());
      return clients.forEach(function(client) {
        return client.write(feedback);
      });
    });
    return websocket.on('close', function() {
      var pos;
      pos = clients.indexOf(websocket);
      if (pos >= 0) {
        return clients.splice(pos, 1);
      }
    });
  }).listen(8080);
}).call(this);
