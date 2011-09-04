(function() {
  var app, express;
  express = require('express');
  app = express.createServer();
  app.configure(function() {
    app.use(express.logger());
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
  app.listen(4000);
  console.log("express server listening on port %d", app.address().port);
}).call(this);
