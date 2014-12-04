'use strict';

angular.module('metube', [
	'ui.router',
	'blog'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('portal', {
		url: '/',
		templateUrl: 'portal.html'
	})
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
	});
}]);