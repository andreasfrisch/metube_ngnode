//frontend/menu/menu.service.js
'use strict';

//TODO: rename

angular.module('menu')
.service('menuService', [function() {
	this.links = [];
	
	this.addLink = function addLinkToMenu(newLink) {
		console.log('menuService; adding a link - ', newLink);
		this.links.push(newLink);
	}
	this.addLinks = function addMultipleLinksToMenu(linkList) {
		for(var i=0; i<linkList.length; i++) {
			this.links.push(linkList[i]);	
		}
		console.log('menuService added multiple links. Links are now: ', this.links);
	}
	
	this.removeLinks = function removeLinksFromMenu() {
		this.links = [];
	}
}]);