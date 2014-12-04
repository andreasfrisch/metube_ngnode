'use strict';

angular.module('blogView')
.controller('blogView', ['$scope', '$stateParams', 'blogApi', function($scope, $stateParams, blogApi) {
	blogApi.getSpecificPost($stateParams.postId).then(
		 //success
		function(postObject) {
			$scope.post = postObject;
		}
		//handle error
	);
}]);