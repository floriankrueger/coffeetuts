(function() {
  var carrier, connections, net;
  net = require('net');
  carrier = require('carrier');
  connections = [];
  net.createServer(function(connection) {
    var username;
    connections.push(connection);
    connection.on('close', function() {
      var pos;
      pos = connections.indexOf(connection);
      if (pos >= 0) {
        return connections.splice(pos, 1);
      }
    });
    connection.write("Hello and welcome to this chat server!\n");
    connection.write("Please provide your user name:\n");
    username = null;
    return carrier.carry(connection, function(line) {
      var feedback;
      if (!username) {
        username = line;
        connection.write("Hello, " + username + "!\n");
        return;
      }
      if (line === 'quit') {
        connection.end();
        return;
      }
      feedback = "" + username + ": " + line + "\n";
      return connections.forEach(function(a_connection) {
        return a_connection.write(feedback);
      });
    });
  }).listen(4000);
}).call(this);
