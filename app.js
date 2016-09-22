var express = require('express');
var path = require('path');

var app = express();

// ============ Settings
// == get port from environment if exists
// Note: use 0 for random port
app.set('port', process.env.PORT || 5000);

// == Displayed application name
app.set('name', process.env.npm_package_name);
app.set('version', process.env.npm_package_version)

// == HTML templates and their globals
app.set('view engine', 'pug');
Object.assign(app.locals, {
  site: {
    title: app.get('name') + " v" + app.get('version'),
    description: process.env.npm_package_description
  },
  author: {
    name: 'Michelle Baert',
    contact: 'rocky.road@rocky0shore.net'
  }
});

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
    message: "Hello world!"
  });
});

// ============= Late middleware
// == serving static files
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.static(path.join(__dirname, 'bower_components')));

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
