'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    //require('load-grunt-tasks')(grunt);

	//time grunt tasts
	require('time-grunt')(grunt);
	
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		project: {
			 app: ['.'],
			 //assets: ['<%= project.app %>/assets'],
			 //css: ['<%= project.app %>/**/*.scss']
		},
		
		// automatically update HTML with bower dependencies
		bowerInstall: {
			target: {
				src: ['<%= project.app %>/frontend/index.html'],
				dependencies: true,
				devdependencies: false
			}
		},
		
		// compile scss and sass files to css
		sass: {
			dist: {
				files: {
					'<%= project.app %>/frontend/metube.style.css' : '<%= project.app %>/frontend/metube.style.scss',
					'<%= project.app %>/frontend/authentication/authentication.style.css' : '<%= project.app %>/frontend/authentication/authentication.style.scss',
					'<%= project.app %>/frontend/blog/menu.style.css' : '<%= project.app %>/frontend/blog/menu.style.scss',
					'<%= project.app %>/frontend/blog/view/view.style.css' : '<%= project.app %>/frontend/blog/view/view.style.scss',
					'<%= project.app %>/frontend/blog/archive/archive.style.css' : '<%= project.app %>/frontend/blog/archive/archive.style.scss',
					'<%= project.app %>/frontend/blog/create/create.style.css' : '<%= project.app %>/frontend/blog/create/create.style.scss',
				}
			}
		},
		
		// Make sure code styles are up to par and there are no obvious mistakes
		jshint: {
			options: {
				jshintrc: '.jshintrc',
			},
			all: {
				src: [
					'Gruntfile.js',
					'karma.conf.js',
					'<%= project.app %>/backend/**/*.js',
					'<%= project.app %>/frontend/{,blog/**,}/*.js',
				]
			}
		},
		
		// Test settings
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				//singleRun: true
			}
		},
		
		express: {
			all: {
				options: {
					port: 8080,
					hostname: '0.0.0.0',
					bases: ['frontend'],
					livereload: true,
				}
			}
		},
		
		nodemon: {
			dev: {
				script: 'server.js'
			}
		},
		
		open: {
			server: {
				url: 'http://localhost:<%= express.all.options.port%>'
			}
		},
		
	    watch: {
			//bower: {
			//	files: ['bower.json'],
			//	tasks: ['wiredep']
			//},
			scss: {
				files: [
					'<%= project.app %>/frontend/metube.style.scss',
					'<%= project.app %>/frontend/{,blog/**/}*.scss'
				],
				tasks: ['sass'],
				options: {
					livereload: true,
				}
			},
			js: {
				files: [
					'<%= project.app %>/frontend/{,blog/**}/*.js',
				],
				tasks: ['jshint', 'karma'],
				options: {
					livereload: true,
				}
			},
			html: {
				files: [
					'<%= project.app %>/frontend/{,blog/**}/*.html',
				],
				options: {
					livereload: true,
				}
			},
			
		},
		
		concurrent: {
			options: {
				logConcurrentOutput: true,
			},
			tasks: ['nodemon', 'open', 'watch']
		}
	
		//TODO:
		//concat
		//minify / uglify
		//wiredep
	
	});
	
	//Write log on watch event firing
	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln('WATCH: ' + target + ': ' + filepath + ' has ' + action);
	});
	
	//not needed when require('load-grunt-tasks') is in effect
	//loading specifically grants more control
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-express');
	grunt.loadNpmTasks('grunt-nodemon');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-bower-install');
	grunt.loadNpmTasks('grunt-open');
	grunt.loadNpmTasks('grunt-concurrent');
	
	
	grunt.registerTask('serve', [
		'bowerInstall:target',
		'sass',
		'concurrent'
	]);
	grunt.registerTask('test', [
		'jshint',
		'karma'
	]);
	grunt.registerTask('default', [
		'test',
		'serve',
	]);
};