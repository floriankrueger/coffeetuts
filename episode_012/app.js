(function() {
  var app, express, fs, multipart, photos, products;
  express = require('express');
  multipart = require('multipart');
  fs = require('fs');
  app = express.createServer();
  app.configure(function() {
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
  photos = require('./photos');
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
    return photos.list(function(err, photo_list) {
      if (err) {
        throw err;
      }
      return res.render('products/edit', {
        locals: {
          product: product,
          photos: photo_list
        }
      });
    });
  });
  app.put('/products/:id', function(req, res) {
    var id;
    id = req.params.id;
    products.set(id, req.body.product);
    return res.redirect("/products/" + id);
  });
  /*
  Photos
  */
  app.get('/photos', function(req, res) {
    return photos.list(function(err, photo_list) {
      return res.render('photos/index', {
        locals: {
          photos: photo_list
        }
      });
    });
  });
  app.get('/photos/new', function(req, res) {
    return res.render('photos/new');
  });
  app.post('/photos', function(req, res) {
    var parser, ws;
    req.setEncoding('binary');
    parser = multipart.parser();
    parser.headers = req.headers;
    ws = null;
    parser.onpartbegin = function(part) {
      ws = fs.createWriteStream("" + __dirname + "/static/upload/photos/" + part.filename, {
        encoding: 'binary'
      });
      return ws.on('error', function(err) {
        throw err;
      });
    };
    parser.ondata = function(data) {
      return ws.write(data, 'binary');
    };
    parser.onpartend = function() {
      ws.end();
      parser.close();
      return res.redirect('/photos');
    };
    return req.on('data', function(data) {
      return parser.write(data);
    });
  });
  app.listen(4000);
  console.log("Express server listening on port %d", app.address().port);
}).call(this);
