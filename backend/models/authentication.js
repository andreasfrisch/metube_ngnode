//backend/models/authentication.js
'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10; // explicit definition of default bcrypt salt factor
//max 5 login attempts resulting in a 2 hour lockout
var MAX_LOGIN_ATTEMPTS = 5;
var LOCK_TIME = 2 * 60 * 60 * 1000;

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		index: {unique: true}
	},
	password: {
		type: String,
		required: true
	},
	loginAttempts: {
		type: Number,
		required: true,
		default: 0
	},
	lockUntil: {
		type: Number
	}
});

UserSchema.virtual('isLocked').get(function() {
	//check for a lockUntil timestamp and if it is in the future
	return !!(this.lockUntil && this.lockUntil > Date.now());
});

UserSchema.pre('save', function(next) {
	var user = this;

	// only hash the password if it has been modified (or is new)
	if (!user.isModified('password')) {
		return next();
	}

	// generate a salt
	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
		if (err) {
			return next(err);
		}

		// hash the password along with our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) {
				return next(err);
			}

			// override the cleartext password with the hashed one
			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
	bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
		if (err) {
			return callback(err);
		}
		callback(null, isMatch);
	});
};

UserSchema.methods.incrementLoginAttempts = function(callback) {
	// if we have a previous lock that has expired, restart at 1
	if (this.lockUntil && this.lockUntil < Date.now()) {
		return this.update({
			$set: { loginAttempts: 1 },
			$unset: { lockUntil: 1 }
		}, callback);
	}
	// otherwise we're incrementing
	var updates = { $inc: { loginAttempts: 1 } };
	// lock the account if we've reached max attempts and it's not locked already
	if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
		updates.$set = { lockUntil: Date.now() + LOCK_TIME };
	}
	return this.update(updates, callback);
};

var reasons = UserSchema.statics.failedLogin = {
	NOT_FOUND: 0,
	PASSWORD_INCORRECT: 1,
	MAX_ATTEMPTS: 2
};

UserSchema.static('getAuthenticated', function(username, password, callback) {
	console.log('backend > UserModel.getAuthenticated() : initiating');
	this.findOne({ username: username }, function(error, user) {
		if (error) {
			return callback(error);
		}

		// make sure the user exists
		if (!user) {
			return callback(null, null, reasons.NOT_FOUND);
		}
		console.log('backend > UserModel.getAuthenticated() : user found');

		// check if the account is currently locked
		if (user.isLocked) {
			console.log('backend > UserModel.getAuthenticated() : user is locked');
			// just increment login attempts if account is already locked
			return user.incrementLoginAttempts(function(error) {
				if (error) {
					return callback(error);
				}
				return callback(null, null, reasons.MAX_ATTEMPTS);
			});
		}
		
		console.log('backend > UserModel.getAuthenticated() : comparing passwords');
		// test for a matching password
		user.comparePassword(password, function(error, isMatch) {
			if (error) {
				return callback(error);
			}

			// check if the password was a match
			if (isMatch) {
				console.log('backend > UserModel.getAuthenticated() : correct password');
				// if there's no lock or failed attempts, just return the user
				if (!user.loginAttempts && !user.lockUntil) {
					return callback(null, user);
				}
				// reset attempts and lock info
				var updates = {
					$set: { loginAttempts: 0 },
					$unset: { lockUntil: 1 }
				};
				return user.update(updates, function(error) {
					if (error) {
						return callback(error);
					}
					return callback(null, user);
				});
			}

			// password is incorrect, so increment login attempts before responding
			console.log('backend > UserModel.getAuthenticated() : wrong password, incremented remaining attempts');
			user.incrementLoginAttempts(function(error) {
				if (error) {
					return callback(error);
				}
				return callback(null, null, reasons.PASSWORD_INCORRECT);
			});
		});
	});
});

// create the model for Users and expose it to our app
module.exports = mongoose.model('User', UserSchema);