net     = require 'net'
carrier = require 'carrier'

connections = []

net.createServer (connection) ->

  connections.push connection

  connection.on 'close', ->
    pos = connections.indexOf connection
    
    if pos >= 0
      connections.splice pos, 1

  connection.write "Hello and welcome to this chat server!\n"
  connection.write "Please provide your user name:\n"

  username = null

  carrier.carry connection, (line) ->

    if not username
      username = line
      connection.write "Hello, #{username}!\n"
      return

    if line == 'quit'
      connection.end()
      return

    feedback = "#{username}: #{line}\n"

    connections.forEach (a_connection) ->
      a_connection.write feedback

.listen 4000