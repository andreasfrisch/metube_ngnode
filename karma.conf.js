'use strict';

module.exports = function(config) {
	
	config.set({
		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// base path, that will be used to resolve files and exclude
		basePath: 'frontend/',

		// testing framework to use (jasmine/mocha/qunit/...)
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: [
			/*
			 * Dependencies
			 * Specified to enforce load order
			 */
			'_libs_/angular/angular.js',
			'_libs_/angular-mocks/angular-mocks.js',
			'_libs_/angular-ui-router/release/angular-ui-router.js',
			
			'metube.module.js',
			
			'blog/blog.module.js',
			'blog/blogApi.service.js',
			'blog/view/view.module.js',
			'blog/view/view.controller.js',
			'blog/archive/archive.module.js',
			'blog/archive/archive.controller.js',
					
			/*
			 * Test specs:
			 */
			'**/*.test.js'
		],

		// list of files / patterns to exclude
		exclude: [],

		// web server port
		port: 8081,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: [
			'PhantomJS'
		],
		reporters: ['progress', 'coverage'],
		preprocessors: {'**/*.test.js': ['coverage']},

		// Which plugins to enable
		plugins: [
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage'
		],

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true,

		colors: true,

		// level of logging
		// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
		logLevel: config.LOG_INFO,
	});
};
