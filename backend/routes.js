// backend/routes.js
'use strict';

//TODO: split into separate routing files for different aspects of the application

module.exports = function(app) {
	var BlogPostModel = require('./models/blog');
	var UserModel = require('./models/authentication');
	var expressJwt = require('express-jwt');
	var jwt = require('jsonwebtoken');
	var secret = require('./config/authentication');

	/*
	 * Authentication Routes
	 */
	app.post('/api/auth/register', function(request, response) {
		console.log('backend > creating new user');
		UserModel.findOne({
			username: request.body.username,
		}, function(error, user) {
			if (error || user !== null) {
				console.log('backend > user already existing');
				response.status(400).end();
			} else {
				UserModel.create({
					username: request.body.username,
					password: request.body.password,
				}, function() {
					console.log('backend > user created succesfully..');
					UserModel.find(function(error, users) {
						if (error) {
							console.log('backend > error finding all users: ', error);
							response.status(error.status).end();
						} else {
							console.log('backend > done');
							response.json(users);
						}
					});
				});				
			}
		});
	});

	app.post('/api/auth/login', function(request, response) {
		var username = request.body.username || '';
		var password = request.body.password || '';
		
		if (username === '' || password === '') {
			return response.status(401).end();
		}
		
		console.log('backend > login user');
		UserModel.getAuthenticated(username, password, function(error, user, reason) {
			if (error) {
				throw error;
			}
			
			//login is successful if we have a user
			if (user) {
				console.log('backend > login successful');
				var token = jwt.sign(user, secret.secretToken, {expiresInMinutes: 60});
				response.send(token);
				return;
			}
			
			//otherwise determine why we failed
			var reasons = UserModel.failedLogin;
			switch (reason) {
				case reasons.NOT_FOUND:
				case reasons.PASSWORD_INCORRECT:
					//never tell the user *why* login failed
					//treat these identically
					console.log('backend > incorrect username or password');
					response.status(400).end();
					break;
				case reasons.MAX_LOGIN_ATTEMPTS:
					console.log('backend > max login attempts');
					response.status(401).end();
					break;
			}
		});
	});

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
	app.post('/api/blog/posts', expressJwt({secret: secret.secretToken}), function(request, response) {
		console.log('creating new post');
		BlogPostModel.create({
			title: request.body.title,
			author: request.body.author,
			postedDate: request.body.postedDate,
			tags: request.body.tags,
			paragraphs: request.body.paragraphs
		}, function(err) {
			console.log('entering create callback: ', err);
			BlogPostModel.find(function(error, blogPosts) {
				console.log('success. Now found, ', blogPosts);
				if (error) {
					console.log('error ', error);
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
		);
	});
	
	// Load single-view file. Let Angular handle the rest
	app.get('/', function(request, response) {
		response.sendfile('frontend/metube.index.html');
	});
};