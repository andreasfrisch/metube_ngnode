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
		url: '/entry/:slug',
		templateUrl: 'blog/view/view.html',
		controller: 'blogView'
	})
	.state('blog.create', {
		url: '/create',
		abstract: true,
		templateUrl: 'blog/create/create.frame.html',
	})
	.state('blog.create.content', {
		url: '/content',
		templateUrl: 'blog/create/create.content.html',
		controller: 'blogCreateContent'
	})
	.state('blog.create.layout', {
		url: '/layout',
		templateUrl: 'blog/create/create.layout.html',
		controller: 'blogCreateLayout'
	})
	.state('blog.create.preview', {
		url: '/preview',
		templateUrl: 'blog/create/create.preview.html',
		controller: 'blogCreatePreview'
	});

}]);