//backend/models/blog.js
'use strict';

var mongoose = require('mongoose');

function slugify(text) {
	return text
		.toString()
		.toLowerCase()
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '-') // Replace multiple - with single -
		.replace(/^-+/, '') // Trim - from start of text
		.replace(/-+$/, ''); // Trim - from end of text
}
  
var Paragraph = mongoose.Schema({
	type: {type: String, required: true},
	content: {type: String, required: true}
});

var blogPost = mongoose.Schema({
	title: {type: String, required: true},
	slug: {type: String},
	author: {type: String, required: true},
	postedDate: {type: Date, required: true},
	tags: {type: [String]},
	paragraphs: {type: [Paragraph], required: true}
});

//generate slug of blogPost before saving
blogPost.pre('save', function (next) {
	this.slug = slugify(this.title);
	next(); 
});

//TODO: create virtual property for more unique post look-up
//http://blog.benmcmahen.com/post/41122888102/creating-slugs-for-your-blog-using-express-js-and

// create the model for Users and expose it to our app
module.exports = mongoose.model('BlogPost', blogPost);