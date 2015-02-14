//frontend/games/slidingCircuit/keyPresses.directive.js
'use strict';

angular.module('slidingCircuit')
.directive('keypressEvents', ['$document', '$rootScope', function($document, $rootScope) {
	return {
		restrict: 'A',
		link: function() {
			$document.bind('keydown', function(event) {
				console.log(event);
				$rootScope.$broadcast('keydown', event, event.keyIdentifier);
			});
		}
	}
}]);