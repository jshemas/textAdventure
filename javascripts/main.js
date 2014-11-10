var textAdventureApp = angular.module('textAdventureApp', []);

textAdventureApp.controller('textAdventureCtrl', function ($scope, $http) {
	$http.get('adventure.json').success(function(data) {
		$scope.phones = data;
	});
});