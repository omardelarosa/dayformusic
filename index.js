var express = require('express')
  , logfmt = require('logfmt')
  , bodyParser = require('body-parser');

// middleware
var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));
app.use(logfmt.requestLogger());

var port = Number(process.env.PORT || 5001);
app.listen(port, function() {
  console.log("Listening on " + port);
});