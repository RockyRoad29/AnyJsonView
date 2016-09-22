var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// using random port
var srv = app.listen(0, function () {
    console.log('Example app available on http://localhost:%s', srv.address().port);
});
