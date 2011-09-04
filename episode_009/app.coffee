express = require('express')
app = express.createServer()


# standard configuration
app.configure -> 
  app.use express.logger()
  app.use express.static __dirname + '/static'

# development configuration
app.configure 'development', ->
  app.use express.errorHandler 
    dumpExceptions: true
    showStack: true

# production configuration
app.configure 'production', ->
  app.use express.errorHandler()

app.set 'views', __dirname + '/views'
app.set 'view engine', 'jade'

# accept GET requests on the root
app.get '/', (req, res) ->
  res.render 'root'

# start the app
app.listen 4000

# give a log message
console.log "express server listening on port %d", app.address().port