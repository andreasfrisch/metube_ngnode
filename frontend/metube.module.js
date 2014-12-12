'use strict';

angular.module('metube', [
	'ui.router',
	'authentication',
	'blog'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('portal', {
		url: '/',
		templateUrl: 'portal.html'
	})
	
	// Authentication
	.state('login', {
		url: '/login',
		templateUrl: 'authentication/login.html',
		controller: 'login'
	}) 
	.state('signup', {
		url: '/signup',
		templateUrl: 'authentication/signup.html',
		controller: 'signup'
	})
	/*
	.state('logout', {
		url: '/logout',
		templateUrl: 'authentication/logout.html',
		controller: 'logout'
	})
	*/ 
	
	// Blog
	.state('blog', {
		url: '/blog',
		abstract: true,
		templateUrl: 'blog/menu.html'
	})
	.state('blog.archive', {
		url: '/archive?tags&',
		templateUrl: 'blog/archive/archive.html',
		controller: 'blogArchive'
	})
	.state('blog.view', {
		url: '/:postId',
		templateUrl: 'blog/view/view.html',
		controller: 'blogView'
	})
	.state('blog.newPost', {
		url: '/newPost',
		templateUrl: 'blog/newPost/newPost.html',
		controller: 'blogNewPost'
	});
}]);