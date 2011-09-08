express = require('express')
app = express.createServer()


# standard configuration
app.configure -> 
  app.use express.logger()
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.static __dirname + '/static'

# development configuration
app.configure 'development', ->
  app.use express.errorHandler 
    dumpExceptions: true
    showStack: true

# production configuration
app.configure 'production', ->
  app.use express.errorHandler()

app.set 'views', __dirname+'/views'
app.set 'view engine', 'jade'

# accept GET requests on the root
app.get '/', (req, res) ->
  res.render 'root'

# load products module
products = require './products'

# GET products root
app.get '/products', (req, res) ->
  res.render 'products/index', 
    locals:
      products: products.all

app.post '/products', (req, res) ->
  id = products.insert req.body.product
  res.redirect "/products/#{id}"

# GET product create form
app.get '/products/new', (req, res) ->
  res.render 'products/new', 
    locals:
      product: req.body && req.body.product || products.new()

# GET product detail
app.get '/products/:id', (req, res) ->
  product = products.find req.params.id
  res.render 'products/show',
    locals:
      product: product

# GET product edit form
app.get '/products/:id/edit', (req, res) ->
  product = products.find req.params.id
  res.render 'products/edit',
    locals:
      product: product

# PUT product changes
app.put '/products/:id', (req, res) ->
  id = req.params.id
  products.set id, req.body.product
  res.redirect "/products/#{id}"

# start the app
app.listen 4000

# give a log message
console.log "Express server listening on port %d", app.address().port