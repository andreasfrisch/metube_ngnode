//frontend/games/slidingCircuit/slidingCircuit.controller.js
'use strict';

angular.module('slidingCircuit')
.controller('slidingCircuit', ['$rootScope', '$scope', function($rootScope, $scope) {
	$scope.key = 'none';

	$rootScope.$on('keydown', function(event, object, key) {
		$scope.$apply(function() {
			$scope.key = key;
		});
	})
}]);