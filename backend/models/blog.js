//backend/models/blog.js
'use strict';

var mongoose = require('mongoose');

var Paragraph = mongoose.Schema({
	type: {type: String, required: true},
	content: {type: String, required: true}
});

var blogPost = mongoose.Schema({
	title: {type: String, required: true},
	author: {type: String, required: true},
	postedDate: {type: Date, required: true},
	tags: {type: [String]},
	paragraphs: {type: [Paragraph], required: true}
});

// create the model for Users and expose it to our app
module.exports = mongoose.model('BlogPost', blogPost);