//frontend/menu/menu.controller.js
'use strict';

angular.module('menu')
.controller('menu', ['$scope', '$state', 'authenticationApi', 'menuService', function($scope, $state, authenticationApi, menuService) {
	$scope.menuLinks = [];
	
	$scope.$watch(
		function() {
			return menuService.links
		},
		function(newLinksList) {
			$scope.menuLinks = newLinksList;
		}
	)
	
	$scope.isActive = function linkIsActive(linkState) {
		console.log($state.current.name);	
		return $state.includes(linkState);
	}
		
	$scope.logout = function() {
		authenticationApi.logout();
		$state.go('portal');
	}
		
}]);