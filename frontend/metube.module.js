'use strict';

angular.module('metube', [
	'ui.router',
	'authentication',
	'blog'
])
.factory('tokenInterceptor', ['$q', 'authenticationStatus', function($q, authenticationStatus) {
	return {
		request: _request,
		requestError: _requestError,
		response: _response,
		responseError: _responseError
	};
	
	function _request(config) {
		config.headers = config.headers || {};
		if (sessionStorage.accessToken) {
			config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('accessToken');
		}
		return config;
	}
	function _requestError(rejection) {
		$q.reject(rejection);
	}
	// set local authentication status if request is successful and we have an accesstoken
	// this would happen after browser refresh
	function _response(response) {
		if (response !== null && response.status === 200 && sessionStorage.accessToken && !authenticationStatus.isAuthenticated) {
			authenticationStatus.isAuthenticated = true;
		}
		return response;
	}
	// revoke client authentication if 401 is recieved
	function _responseError(rejection) {
		if (rejection !== null && rejection.status === 401 && (sessionStorage.accessToken || authenticationStatus.isAuthenticated)) {
			sessionStorage.removeItem('accessToken');
			authenticationStatus.isAuthenticated = false;
		}
		return $q.reject(rejection);
	}
}])
.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {
	$httpProvider.interceptors.push('tokenInterceptor');
	$urlRouterProvider.otherwise('/');
	$stateProvider
	.state('portal', {
		url: '/',
		templateUrl: 'portal.html',
		access: {requiresLogin: false}	
	})
	
	//Authentication
	.state('login', {
		url: '/auth/login',
		templateUrl: 'authentication/login.html',
		controller: 'authentication',
		access: {requiresLogin: false}	
	})
	
	// Blog
	.state('blog', {
		url: '/blog',
		abstract: true,
		templateUrl: 'blog/menu.html',
		access: {requiresLogin: false}	
	})
	.state('blog.archive', {
		url: '/archive?tags&',
		templateUrl: 'blog/archive/archive.html',
		controller: 'blogArchive',
		access: {requiresLogin: false}	
	})
	.state('blog.view', {
		url: '/entry/:slug',
		templateUrl: 'blog/view/view.html',
		controller: 'blogView',
		access: {requiresLogin: false}	
	})
	.state('blog.create', {
		url: '/create',
		abstract: true,
		templateUrl: 'blog/create/create.frame.html',
		access: {requiresLogin: true}
	})
	.state('blog.create.content', {
		url: '/content',
		templateUrl: 'blog/create/create.content.html',
		controller: 'blogCreateContent',
		access: {requiresLogin: true}
	})
	.state('blog.create.layout', {
		url: '/layout',
		templateUrl: 'blog/create/create.layout.html',
		controller: 'blogCreateLayout',
		access: {requiresLogin: true}
	})
	.state('blog.create.preview', {
		url: '/preview',
		templateUrl: 'blog/create/create.preview.html',
		controller: 'blogCreatePreview',
		access: {requiresLogin: true}
	});
}])
.run(['$rootScope', '$state', 'authenticationStatus', function($rootScope, $state, authenticationStatus) {
	// redirect to login if attempting to access restricted pages without authentication
	$rootScope.$on('$stateChangeStart', function(event, nextState){
		if (nextState.access.requiresLogin && !authenticationStatus.isAuthenticated) {
			event.preventDefault();
			$state.go('login');
		}
	});
}]);