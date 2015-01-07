// frontend/blog/view/view.controller.test.js
'use strict';

describe('BlogView', function () {
	var mockBlogApi = {
		getSpecificPost: function(postId) {
			return {
				id: postId,
				//...
			};
		}
	};
	var $stateParams;
	var scope;
	
	beforeEach(module('metube'), function($provide) {
		$provide.value('blogApi', mockBlogApi);
	});

	// Initialize the controller and a mock scope
	beforeEach(inject(function($controller, _$rootScope_, _$stateParams_) {
		$stateParams = _$stateParams_;
		scope = _$rootScope_;

		$controller('blogView', {
			'$scope': scope,
			'$stateParams': $stateParams
		});
	}));
	
	/*
	afterEach(function() {
		//...
	});
	*/
	
	it ('should do something', function() {
		//...
	});
});