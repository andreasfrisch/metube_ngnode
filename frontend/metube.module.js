'use strict';

angular.module('metube', [
	'ui.router',
	
	'blog'
])
.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('blog', {
		url: '/blog',
		abstract: true,
		template: '<ui-view />'
	})
	.state('blog.archive', {
		url: '/archive',
		templateUrl: 'blog/archive/archive.html',
		controller: 'blogArchive'
	})
	.state('blog.view', {
		url: '/:blogId',
		templateUrl: 'blog/view/view.html',
		controller: 'blogView'
	});
}]);