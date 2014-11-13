var textAdventureApp = angular.module('textAdventureApp', []);

textAdventureApp.controller('textAdventureCtrl', function ($scope, $http) {
	$http.get('adventure.json').success(function(data) {
		$scope.adventure = {
			adventureName: data.adventureName,
			adventureDescription: data.adventureDescription,
			currentRound: 1,
			currentPaths: [],
			playerAlive: true,
			paths: data.paths
		}
		for (var i = 0; i <= $scope.adventure.paths.length - 1; i++) {
			if($scope.adventure.paths[i].round === $scope.adventure.currentRound) {
				$scope.adventure.currentPaths.push($scope.adventure.paths[i]);
			}
		};
		$scope.pathClick = function (id) {
			for (var i = 0; i <= $scope.adventure.paths.length - 1; i++) {
				if($scope.adventure.paths[i].id === id) {
					if ($scope.adventure.paths[i].death) {
						$scope.adventure.playerAlive = false;
					}
				}
			};
		}
	});
});