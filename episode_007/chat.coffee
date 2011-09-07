http  = require 'http'
fs    = require 'fs'
sys   = require 'sys'
io    = require 'socket.io'

clients = []

server = http.createServer (request, response) ->
  response.writeHead 200,
    'Content-Type':'text/html'
  
  rs = fs.createReadStream __dirname + '/template.html'
  sys.pump rs, response

socket = io.listen server

# First change here 
# OLD: socket.on 'connection', (client) ->
socket.sockets.on 'connection', (client) ->

  username = null

  client.send 'Welcome to this socket.io chat server!'
  client.send 'Please provide your user name'

  client.on 'message', (message) ->
    
    if not username
      username = message
      client.send "welcome, #{username}!"
      return

    feedback = "#{username}: #{message}"

    # OLD: socket.broadcast feedback (did send to ALL clients, 
    # client.broadcast.send does NOT send it back to the sender
    # so for the same functionality, we need to send it explicitly)
    client.send feedback
    client.broadcast.send feedback

server.listen 4000