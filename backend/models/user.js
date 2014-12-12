// backend/models/user.js
'use strict';

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	email: {type: String, required: true, unique: true},
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true}
});

// create the model for Users and expose it to our app
module.exports = mongoose.model('User', userSchema);