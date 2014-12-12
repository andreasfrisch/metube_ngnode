//newPost.controller.js
'use strict';

angular.module('blogNewPost')
.controller('blogNewPost', ['$scope', '$state', 'blogApi', function($scope, $state, blogApi) {
	$scope.newPost = {};
	$scope.submitBlogPost = function(postData) {
		console.log('submitting...');
		var paragraphs = [
			{
				type: 'text',
				content: postData.content
			}
		];
		var tags = [postData.tags];
		var newPostData = {
			title: postData.title,
			author: postData.author,
			postedDate: postData.postedDate,
			tags: tags,
			paragraphs: paragraphs
		};
		blogApi.createNewPost(newPostData)
		.then(
			function() {
				$state.go('blog.archive');
			}
			//handle errors
		);
	};
}]);