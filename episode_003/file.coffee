http  = require 'http'
fs    = require 'fs'
sys   = require 'sys'

file_path = __dirname + '/cat.jpg'

fs.stat file_path, (err, stat) ->

  throw err if err

  http.createServer (request, response) ->
    response.writeHead 200, 
      'Content-Type':'image/jpeg'
      'Content-Length':stat.size

    # third approach
    rs = fs.createReadStream file_path
    sys.pump rs, response, (err) ->
      throw err if err

    # second approach
    #rs = fs.createReadStream file_path
    #
    #rs.on 'data', (data) ->
    #  flushed = response.write data
    #  rs.pause() if not flushed 
    #
    #response.on 'drain', ->
    #  rs.resume()
    #
    #rs.on 'end', ->
    #  response.end()

    # first approach
    #fs.readFile file_path, (err, file_content) ->
    #  response.write file_content

  .listen 4000