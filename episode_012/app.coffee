express   = require('express')
multipart = require('multipart')
fs        = require('fs')

app = express.createServer()

# standard configuration
app.configure -> 
  # app.use express.logger()
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

# load photos module
photos = require './photos'

# GET products root
app.get '/products', (req, res) ->
  res.render 'products/index', 
    locals:
      products: products.all

# POST new product
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
  photos.list (err, photo_list) ->
    if err 
      throw err

    res.render 'products/edit',
      locals:
        product: product
        photos: photo_list

# PUT product changes
app.put '/products/:id', (req, res) ->
  id = req.params.id
  products.set id, req.body.product
  res.redirect "/products/#{id}"

###
Photos
###

app.get '/photos', (req, res) ->
  photos.list (err, photo_list) ->
    res.render 'photos/index', 
      locals:
        photos: photo_list


app.get '/photos/new', (req, res) ->
  res.render 'photos/new'

app.post '/photos', (req, res) ->
  req.setEncoding 'binary'

  parser = multipart.parser()
  parser.headers = req.headers

  ws = null

  parser.onpartbegin = (part) ->
    ws = fs.createWriteStream "#{__dirname}/static/upload/photos/#{part.filename}", 
      encoding: 'binary'

    ws.on 'error', (err) ->
      throw err

  parser.ondata = (data) ->
    ws.write data, 'binary'

  parser.onpartend = () ->
    ws.end()
    parser.close()
    res.redirect '/photos'

  req.on 'data', (data) ->
    parser.write data

# start the app
app.listen 4000

# give a log message
console.log "Express server listening on port %d", app.address().port