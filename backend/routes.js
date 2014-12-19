// backend/routes.js
'use strict';

module.exports = function(app) {
	var BlogPostModel = require('./models/blog');

	/*
	 * Blog Routes
	 */
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
			BlogPostModel.find(function(error, blogPosts) {
				if (error) {
					response.send(error);
				}
				response.json(blogPosts);
			});
		});
	});
	app.get('/api/blog/posts/:slug', function(request, response) {
		BlogPostModel.findOne(
			{'slug': request.params.slug},
			function(error, blogPost) {
				if (error) {
					response.send(error);
				}
				response.json(blogPost);
			}
		)
	});
	
	
	
	// Load single-view file. Let Angular handle the rest
	app.get('/', function(request, response) {
		response.sendfile('frontend/metube.index.html');
	});
};