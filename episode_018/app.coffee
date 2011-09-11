express   = require 'express'
multipart = require 'multipart'
fs        = require 'fs' 
mongoose  = require('mongoose')

db = mongoose.connect 'mongodb://localhost/db'

app = express.createServer()

# standard configuration
app.configure -> 
  # app.use express.logger()
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use express.static __dirname + '/static'
  app.use express.cookieParser()
  app.use express.session
    secret: "submarine"

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

app.dynamicHelpers
  
  session: (req, res) ->
    return req.session
  
  flash: (req, res) ->
    return req.flash()

requiresLogin = (req, res, next) ->
  if req.session.user
    next()
  else
    res.redirect "/sessions/new?redir=#{req.url}"    

# accept GET requests on the root
app.get '/', (req, res) ->
  res.render 'root'

###
Sessions
###

# load users module
require './users'
User = mongoose.model 'User'

# GET the login form
app.get '/sessions/new', (req, res) ->
  res.render 'sessions/new',
    locals:
      redir: req.query.redir

# POST a new session
app.post '/sessions', (req, res) ->
  User.authenticate req.body.login, req.body.password, (user) ->
    if user
      req.session.user = user
      res.redirect req.body.redir || '/'
    else
      req.flash 'warn', 'login failed'
      res.render 'sessions/new', 
        locals:
          redir: req.body.redir

# GET-DELETE a session
app.get '/sessions/destroy', (req, res) ->
  delete req.session.user
  res.redirect '/sessions/new'

###
Products
###

# load products module
require './products'
Product = mongoose.model 'Product'

# load photos module
photos = require './photos'

# GET products root
app.get '/products', (req, res) ->
  Product.all (all) ->
    res.render 'products/index', 
      locals:
        products: all

# POST new product
app.post '/products', requiresLogin, (req, res) ->
  product = new Product req.body.product
  product.save () ->
    res.redirect "/products/#{product._id.toHexString()}"

# GET product create form
app.get '/products/new', requiresLogin, (req, res) ->
  photos.list (err, photo_list) ->
    if err 
      throw err

    res.render 'products/new', 
      locals:
        product: req.body && req.body.product || new Product()
        photos: photo_list

# GET product detail
app.get '/products/:id', requiresLogin, (req, res) ->
  Product.findById req.params.id, (err, product) ->
    res.render 'products/show',
      locals:
        product: product

# GET product edit form
app.get '/products/:id/edit', requiresLogin, (req, res) ->
  Product.findById req.params.id, (err, product) ->
    
    photos.list (err, photo_list) ->
      if err 
        throw err

      res.render 'products/edit',
        locals:
          product: product
          photos: photo_list

# PUT product changes
app.put '/products/:id', requiresLogin, (req, res) ->
  
  Product.findById req.params.id, (err, product) ->
    
    product.name = req.body.product.name
    product.description = req.body.product.description
    product.price = req.body.product.price
    product.photo = req.body.product.photo

    product.save () ->
      res.redirect "/products/#{product._id.toHexString()}"

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