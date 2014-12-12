// frontend/authentication/authenticationApi.service.js
'use strict';

angular.module('authentication')
.factory('authenticationApi', ['$http', '$q', function($http, $q) {
	/* The API as a dictionary of functions
	 */
	return {
		//signup: _signup,
		login: _login,
		logout: _logout
	}
	
	/* The API function definitions
	 * hoisted by JS at runtime
	 */
	
	/*
	function _signup(username, password) {
		var deferred = $q.defer();
		deferred.resolve(200);
		return deferred.promise;
	}
	*/
	
	function _login(username, password) {
		var deferred = $q.defer();
		$http.post('someWhereOverTheRainbow', {
			username: username,
			password: password
		})
		.then(
			function(result) {
				console.log(result);
			}
			//handle error
		)
		return deferred.promise;
	}

	function _logout(username, password) {
		var deferred = $q.defer();
		deferred.resolve(200);
		return deferred.promise;
	}
}]);