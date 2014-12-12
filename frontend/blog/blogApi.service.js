// frontend/blog/blogApi.service.js
'use strict';

angular.module('blog')
.factory('blogApi', ['$http', '$q', function($http, $q) {
	var MOCKpostList = [
		{
			id: 0,
			title: 'Test Post',
			author: 'Frisch',
			postedDate: '1400167800',
			tags: [
				'test',
				'lorem'
			],
			paragraphs: [
				{
					type: 'text',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas leo eros, finibus at odio a, sagittis molestie mauris. Nunc mattis odio a finibus ultricies. Nam non auctor ante, a tincidunt sapien. Nullam lacinia tristique ligula quis rhoncus. Donec tempus commodo dui, at rutrum sem tincidunt bibendum. Vivamus id diam condimentum, facilisis sem nec, finibus augue. Sed eu nibh convallis, pellentesque mi non, commodo nisl. Phasellus tempus pharetra arcu eu semper. Maecenas feugiat placerat volutpat. Quisque pharetra, massa ut scelerisque dapibus, neque risus egestas nibh, nec lobortis erat magna sit amet quam. Nunc a sem eu tortor dictum aliquet id et erat. Morbi sit amet nunc neque. Proin ultricies mattis odio eu blandit. Sed porta accumsan arcu, in rhoncus nunc ultricies non. Morbi a ligula eget mauris elementum semper. Ut felis eros, semper quis libero faucibus, consequat suscipit mi.'
				},
				{
					type: 'text',
					content: 'Suspendisse tempus mi non dictum aliquam. Aenean quis bibendum nulla, sit amet suscipit nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent augue arcu, imperdiet vitae volutpat ac, sodales eu turpis. Aliquam erat volutpat. Aliquam erat volutpat. Vivamus dignissim blandit ligula, ac ullamcorper magna molestie eleifend. Nunc maximus lacinia orci, eu euismod orci cursus sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin consectetur tellus in luctus iaculis. Pellentesque dolor massa, bibendum euismod mi at, cursus rhoncus est. Sed porta nibh id ultrices sagittis. Cras suscipit sapien mi, et cursus ex consectetur sed. Suspendisse egestas fermentum nisl.'
				},
				{
					type: 'header',
					content: 'And now for something completely different',
				},
				{
					type: 'image',
					url: 'http://upload.wikimedia.org/wikipedia/commons/8/8d/American_bison_k5680-1.jpg',
					alt: 'Look at this!',
					caption: 'A bison!'
				},
				{
					type: 'header',
					content: 'And now back to rambling',
				},
				{
					type: 'text',
					content: 'Nam sem nisl, lobortis sit amet dolor ac, aliquam mattis orci. Maecenas sed accumsan libero, at commodo neque. In neque dui, tempus nec feugiat at, elementum dictum sem. Praesent eleifend ante sit amet eleifend pharetra. Morbi dapibus, ipsum vel convallis pretium, purus leo molestie magna, sit amet porttitor augue augue vel dolor. Ut velit nisl, iaculis nec massa sit amet, efficitur rutrum diam. Nullam elementum orci eu luctus sollicitudin. In viverra scelerisque lorem in hendrerit. Quisque fringilla risus at sapien pharetra, sit amet dignissim magna tincidunt. Sed nec eros sagittis, consequat urna a, pretium nunc.'
				},
				{
					type: 'text',
					content: 'Aenean cursus viverra quam id posuere. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas convallis rhoncus diam in condimentum. Aenean id diam lacus. Maecenas at ullamcorper quam, in aliquam enim. Vestibulum imperdiet nisi magna, sit amet lobortis urna scelerisque in. Pellentesque aliquet odio eu sem laoreet, vitae rutrum quam iaculis. Nullam sed nunc lorem. Curabitur ac mi placerat, interdum mauris lobortis, rutrum metus. Suspendisse laoreet non magna a blandit. Sed urna est, hendrerit ac metus at, malesuada vestibulum justo. Maecenas vel magna ex.'
				},
			]
		},
		{
			id: 1,
			title: 'Test Post 2.0',
			author: 'Andreas Frisch',
			postedDate: '1400257800',
			tags: [
				'test'
			],
			paragraphs: [
				{
					type: 'text',
					content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas leo eros, finibus at odio a, sagittis molestie mauris. Nunc mattis odio a finibus ultricies. Nam non auctor ante, a tincidunt sapien. Nullam lacinia tristique ligula quis rhoncus. Donec tempus commodo dui, at rutrum sem tincidunt bibendum. Vivamus id diam condimentum, facilisis sem nec, finibus augue. Sed eu nibh convallis, pellentesque mi non, commodo nisl. Phasellus tempus pharetra arcu eu semper. Maecenas feugiat placerat volutpat. Quisque pharetra, massa ut scelerisque dapibus, neque risus egestas nibh, nec lobortis erat magna sit amet quam. Nunc a sem eu tortor dictum aliquet id et erat. Morbi sit amet nunc neque. Proin ultricies mattis odio eu blandit. Sed porta accumsan arcu, in rhoncus nunc ultricies non. Morbi a ligula eget mauris elementum semper. Ut felis eros, semper quis libero faucibus, consequat suscipit mi.'
				},
				{
					type: 'text',
					content: 'Suspendisse tempus mi non dictum aliquam. Aenean quis bibendum nulla, sit amet suscipit nulla. Interdum et malesuada fames ac ante ipsum primis in faucibus. Praesent augue arcu, imperdiet vitae volutpat ac, sodales eu turpis. Aliquam erat volutpat. Aliquam erat volutpat. Vivamus dignissim blandit ligula, ac ullamcorper magna molestie eleifend. Nunc maximus lacinia orci, eu euismod orci cursus sit amet. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin consectetur tellus in luctus iaculis. Pellentesque dolor massa, bibendum euismod mi at, cursus rhoncus est. Sed porta nibh id ultrices sagittis. Cras suscipit sapien mi, et cursus ex consectetur sed. Suspendisse egestas fermentum nisl.'
				},
				{
					type: 'header',
					content: 'And now for something completely different',
				},
				{
					type: 'image',
					url: 'http://upload.wikimedia.org/wikipedia/commons/8/8d/American_bison_k5680-1.jpg',
					alt: 'Look at this!',
					caption: 'A bison!'
				},
				{
					type: 'header',
					content: 'And now back to rambling',
				},
				{
					type: 'text',
					content: 'Nam sem nisl, lobortis sit amet dolor ac, aliquam mattis orci. Maecenas sed accumsan libero, at commodo neque. In neque dui, tempus nec feugiat at, elementum dictum sem. Praesent eleifend ante sit amet eleifend pharetra. Morbi dapibus, ipsum vel convallis pretium, purus leo molestie magna, sit amet porttitor augue augue vel dolor. Ut velit nisl, iaculis nec massa sit amet, efficitur rutrum diam. Nullam elementum orci eu luctus sollicitudin. In viverra scelerisque lorem in hendrerit. Quisque fringilla risus at sapien pharetra, sit amet dignissim magna tincidunt. Sed nec eros sagittis, consequat urna a, pretium nunc.'
				},
				{
					type: 'text',
					content: 'Aenean cursus viverra quam id posuere. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas convallis rhoncus diam in condimentum. Aenean id diam lacus. Maecenas at ullamcorper quam, in aliquam enim. Vestibulum imperdiet nisi magna, sit amet lobortis urna scelerisque in. Pellentesque aliquet odio eu sem laoreet, vitae rutrum quam iaculis. Nullam sed nunc lorem. Curabitur ac mi placerat, interdum mauris lobortis, rutrum metus. Suspendisse laoreet non magna a blandit. Sed urna est, hendrerit ac metus at, malesuada vestibulum justo. Maecenas vel magna ex.'
				},
			]
		}
	];
	
	// Function definitions:
	// hoisted during runtime
	
	// TODO: return only the data required for showing an archive
	function _getAllPosts() {
		//var deferred = $q.defer();
		//deferred.resolve(MOCKpostList);
		//return deferred.promise;
		return $http.get('/api/blog/posts');
	}
	function _getFilteredPosts() {
		var deferred = $q.defer();
		deferred.resolve([MOCKpostList[0]]);
		return deferred.promise;
	}
	function _getSpecificPost(postId) {
		var deferred = $q.defer();
		deferred.resolve(MOCKpostList[postId]);
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
	
	// API definition
	//TODO: move to top when no longer using dummy data
	return {
		getAllPosts: _getAllPosts,
		getFilteredPosts: _getFilteredPosts,
		getSpecificPost: _getSpecificPost,
		createNewPost: _createNewPost,
	};
	
}]);