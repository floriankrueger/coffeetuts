(function() {
  var Product, User, app, db, express, fs, mongoose, multipart, photos, requiresLogin;
  express = require('express');
  multipart = require('multipart');
  fs = require('fs');
  mongoose = require('mongoose');
  db = mongoose.connect('mongodb://localhost/db');
  app = express.createServer();
  app.configure(function() {
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/static'));
    app.use(express.cookieParser());
    return app.use(express.session({
      secret: "submarine"
    }));
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
  app.dynamicHelpers({
    session: function(req, res) {
      return req.session;
    },
    flash: function(req, res) {
      return req.flash();
    }
  });
  requiresLogin = function(req, res, next) {
    if (req.session.user) {
      return next();
    } else {
      return res.redirect("/sessions/new?redir=" + req.url);
    }
  };
  app.get('/', function(req, res) {
    return res.render('root');
  });
  /*
  Sessions
  */
  require('./users');
  User = mongoose.model('User');
  app.get('/sessions/new', function(req, res) {
    return res.render('sessions/new', {
      locals: {
        redir: req.query.redir
      }
    });
  });
  app.post('/sessions', function(req, res) {
    return User.authenticate(req.body.login, req.body.password, function(user) {
      if (user) {
        req.session.user = user;
        return res.redirect(req.body.redir || '/');
      } else {
        req.flash('warn', 'login failed');
        return res.render('sessions/new', {
          locals: {
            redir: req.body.redir
          }
        });
      }
    });
  });
  app.get('/sessions/destroy', function(req, res) {
    delete req.session.user;
    return res.redirect('/sessions/new');
  });
  /*
  Products
  */
  require('./products');
  Product = mongoose.model('Product');
  photos = require('./photos');
  app.get('/products', function(req, res) {
    return Product.all(function(all) {
      return res.render('products/index', {
        locals: {
          products: all
        }
      });
    });
  });
  app.post('/products', requiresLogin, function(req, res) {
    var product;
    product = Product["new"](req.body.product);
    return product.save(function() {
      return res.redirect("/products/" + (product._id.toHexString()));
    });
  });
  app.get('/products/new', requiresLogin, function(req, res) {
    return photos.list(function(err, photo_list) {
      if (err) {
        throw err;
      }
      return res.render('products/new', {
        locals: {
          product: req.body && req.body.product || new Product(),
          photos: photo_list
        }
      });
    });
  });
  app.get('/products/:id', requiresLogin, function(req, res) {
    return Product.findById(req.params.id, function(err, product) {
      return res.render('products/show', {
        locals: {
          product: product
        }
      });
    });
  });
  app.get('/products/:id/edit', requiresLogin, function(req, res) {
    return Product.findById(req.params.id, function(err, product) {
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
  });
  app.put('/products/:id', requiresLogin, function(req, res) {
    return Product.findById(req.params.id, function(err, product) {
      product.name = req.body.product.name;
      product.description = req.body.product.description;
      product.price = req.body.product.price;
      product.photo = req.body.product.photo;
      return product.save(function() {
        return res.redirect("/products/" + (product._id.toHexString()));
      });
    });
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
