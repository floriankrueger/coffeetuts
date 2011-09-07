http  = require 'http'
fs    = require 'fs'
sys   = require 'sys'
ws    = require './ws.js'

clients = []

http.createServer (request, response) ->
  response.writeHead 200,
    'Content-Type':'text/html'
  
  rs = fs.createReadStream __dirname + '/template.html'
  sys.pump rs, response

.listen 4000

ws.createServer (websocket) ->

  username = null

  websocket.on 'connect', (resource) ->
    clients.push websocket
    websocket.write 'Welcome to this chat server!'
    websocket.write "Please provide your user name"

  websocket.on 'data', (data) ->
    
    if not username
      username = data.toString()
      websocket.write "welcome, #{username}!"
      return

    feedback = "#{username}: #{data.toString()}"

    clients.forEach (client) ->
      client.write feedback

  websocket.on 'close', ->
    pos = clients.indexOf websocket
    
    if pos >= 0
      clients.splice pos, 1 
.listen 8080