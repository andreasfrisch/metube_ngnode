// server.js
'use struct';

/*
 * Setup
 */
var express = require('express');
var app = express(); // create our app using express
var morgan = require('morgan'); //log requests to console
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); // parses HTML POST body
var methodOverride = require('method-override'); // simulate DELETE and PUT
var dbConfig = require('backend/config/database');
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
var BlogPostModel = require('backend/models/blog.js');

/*
 * Routing:
 */
// load our routes and pass in our app
//require('./backend/routes.js')(app);
app.get('/api/blog/posts', function(request, response) {
	BlogPostModel.find(function(error, blogPosts) {
		if (error) {
			response.send(error);
		}
		response.json(blogPosts);
	});
});
app.post('/api/blog/posts', function(request, response) {
	BlogPostModel.create({
		title: request.body.title,
		author: request.body.author,
		postedDate: request.body.postedDate,
		tags: request.body.tags,
		paragraphs: request.body.paragraphs
	}, function(error, blogPost) {
		if (error) {
			response.send(error);
		}
		BlogPostModel.find(function(error, blogPosts) {
			if (error) {
				response.send(error);
			}
			response.json(blogPosts);
		});
	});
});

// Load single-view file. Let Angular handle the rest
app.get('*', function(request, response) {
	response.sendfile('frontend/metube.index.html');
});

// listen (start app with node server.js)
app.listen(8080);
console.log("App listening on port 8080");