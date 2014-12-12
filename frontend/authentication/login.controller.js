// frontend/authentication/login.controller.js
'use strict';

angular.module('authentication')
.controller('login', ['$scope', '$state', 'authenticationApi', function($scope, $state, authenticationApi) {
	$scope.login = function(username, password) {
		authenticationApi.login(username, password).then(
			//success
			function(response) {
				$state.go('portal');
			}
			//handle error
		);
	}
}]);