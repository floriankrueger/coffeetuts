http = require 'http'
spawn = require('child_process').spawn

http.createServer (request, response) ->
  response.writeHead 200, 
    'Content-Type':'text/plain'
  
  tail_child = spawn 'tail', ['-f','/var/log/system.log']

  request.connection.on 'end', ->
    tail_child.kill()

  tail_child.stdout.on 'data', (data) ->
    console.log data.toString()
    response.write data

.listen 4000