var textAdventureApp = angular.module('textAdventureApp', []);

textAdventureApp.controller('textAdventureCtrl', function ($scope, $http) {
	function updateCurrentPaths() {
		console.log("updateCurrentPaths");
		$scope.adventure.currentPaths = [];
		for (var i = 0; i <= $scope.adventure.paths.length - 1; i++) {
			if($scope.adventure.paths[i].round === $scope.adventure.currentRound) {
				$scope.adventure.currentPaths.push($scope.adventure.paths[i]);
			}
		};
	}
	$http.get('adventure.json').success(function(data) {
		console.log("json get");
		$scope.adventure = {
			adventureName: data.adventureName,
			adventureDescription: data.adventureDescription,
			currentRound: 1,
			currentPaths: [],
			playerAlive: true,
			paths: data.paths
		}
		updateCurrentPaths();
	});
	$scope.pathClick = function (id) {
		console.log("pathClick");
		for (var i = 0; i <= $scope.adventure.paths.length - 1; i++) {
			if($scope.adventure.paths[i].id === id) {
				if ($scope.adventure.paths[i].death) {
					$scope.adventure.playerAlive = false;
				} else {
					$scope.adventure.currentRound = $scope.adventure.currentRound + 1;
					updateCurrentPaths();
				}
			}
		};
	}
	$scope.startOver = function () {
		console.log("startOver");
		$scope.adventure.currentRound = 1;
		$scope.adventure.playerAlive = true;
		updateCurrentPaths();
	}
});