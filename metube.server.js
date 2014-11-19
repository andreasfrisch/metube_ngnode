// Setup
var express = require('express');
var app = express(); // create our app using express
var morgan = require('morgan'); //log requests to console
var bodyParser = require('body-parser'); // parses HTML POST body
var methodOverride = require('method-override'); // simulate DELETE and PUT

app.use(express.static(__dirname + '/frontend')); // set the static files location. Important to serve JS-files properly
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


//Routing:
//Load single-view file. Let Angular handle the rest
app.get('*', function(request, response) {
	response.sendfile('frontend/metube.index.html');
})


// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");