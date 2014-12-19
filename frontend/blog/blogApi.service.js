// frontend/blog/blogApi.service.js
'use strict';

angular.module('blog')
.factory('blogApi', ['$http', '$q', function($http, $q) {
	// API definition
	return {
		getAllPosts: _getAllPosts,
		getFilteredPosts: _getFilteredPosts,
		getSpecificPost: _getSpecificPost,
		createNewPost: _createNewPost,
	};
	
	// Function definitions:
	// hoisted during runtime
	
	// TODO: return only the data required for showing an archive
	function _getAllPosts() {
		var deferred = $q.defer();
		//deferred.resolve(MOCKpostList);
		$http.get('/api/blog/posts')
		.then(
			function(response) {
				console.log(response);
				deferred.resolve(response.data);
			}
			//handle error
		);
		return deferred.promise;
		
	}
	function _getFilteredPosts() {
		var deferred = $q.defer();
		deferred.reject(501);
		return deferred.promise;
	}
	function _getSpecificPost(slug) {
		var deferred = $q.defer();
		//deferred.resolve(MOCKpostList[postId]);
		$http.get('/api/blog/posts/'+slug)
		.then(
			function(response) {
				console.log(response);
				deferred.resolve(response.data);
			}
			//handle error
		);
		return deferred.promise;
	}
	function _createNewPost(newPostData) {
		//var deferred = $q.defer();
		//newPostData.id = MOCKpostList.length;
		//MOCKpostList.push(newPostData);
		//console.log(newPostData);
		//console.log(MOCKpostList.length);
		//deferred.resolve(200);
		//return deferred.promise;
		return $http.post('/api/blog/posts', newPostData);
	}
	
}]);