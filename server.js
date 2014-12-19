// server.js
'use struct';

/*
 * Setup
 */
var express = require('express');
var port     = process.env.PORT || 8080;
var app = express(); // create our app using express
var morgan = require('morgan'); //log requests to console
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // parses HTML POST body
var methodOverride = require('method-override'); // simulate DELETE and PUT
var dbConfig = require('./backend/config/database.js');
/*
 * Configuration
 */

app.use(express.static(__dirname + '/frontend')); // set the static files location. Important to serve JS-files properly
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

mongoose.connect(dbConfig.url);

/*
 * Routing:
 */
// load our routes and pass in our app
require('./backend/routes.js')(app);

// listen (start app with node server.js)
app.listen(port);
console.log("App listening on port "+port);