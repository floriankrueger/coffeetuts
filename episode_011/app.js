(function() {
  var app, express, products;
  express = require('express');
  app = express.createServer();
  app.configure(function() {
    app.use(express.logger());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    return app.use(express.static(__dirname + '/static'));
  });
  app.configure('development', function() {
    return app.use(express.errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
  });
  app.configure('production', function() {
    return app.use(express.errorHandler());
  });
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.get('/', function(req, res) {
    return res.render('root');
  });
  products = require('./products');
  app.get('/products', function(req, res) {
    return res.render('products/index', {
      locals: {
        products: products.all
      }
    });
  });
  app.post('/products', function(req, res) {
    var id;
    id = products.insert(req.body.product);
    return res.redirect("/products/" + id);
  });
  app.get('/products/new', function(req, res) {
    return res.render('products/new', {
      locals: {
        product: req.body && req.body.product || products["new"]()
      }
    });
  });
  app.get('/products/:id', function(req, res) {
    var product;
    product = products.find(req.params.id);
    return res.render('products/show', {
      locals: {
        product: product
      }
    });
  });
  app.get('/products/:id/edit', function(req, res) {
    var product;
    product = products.find(req.params.id);
    return res.render('products/edit', {
      locals: {
        product: product
      }
    });
  });
  app.put('/products/:id', function(req, res) {
    var id;
    id = req.params.id;
    products.set(id, req.body.product);
    return res.redirect("/products/" + id);
  });
  app.listen(4000);
  console.log("Express server listening on port %d", app.address().port);
}).call(this);
