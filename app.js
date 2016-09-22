var express = require('express');
var path = require('path');

var app = express();

// ============ Settings
// == get port from environment if exists
// Note: use 0 for random port
app.set('port', process.env.PORT || 5000);

// == HTML templates
app.set('view engine', 'pug');

// == Displayed application name
app.set('name', process.env.npm_package_name);
app.set('version', process.env.npm_package_version)

// ============= Early middleware
// == Logging requests
app.use(function (req, res, next) {
  console.log('Requested: %s %s', req.method, req.url);
  next();
});

// ============= Routes
// == Home page
app.get('/', function (req, res) {
  res.render('index', {
    title: app.get('name') + " v" + app.get('version'),
    message: process.env.npm_package_description
  });
});

// ============= Late middleware
// == serving static files
app.use(express.static(path.join(__dirname, 'static')));

// ============= HTTP server
var srv = app.listen(app.get('port'), function () {
  var addr = srv.address();
  console.log('%s app version %s available on %s http://%s:%s',
              app.get('name'),
              app.get('version'),
              addr.family,
              addr.address,
              addr.port);
});
