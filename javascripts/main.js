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
			currentPath: 0,
			currentPathDescription: '',
			playerAlive: true,
			winnngRound: data.winnngRound,
			hasWon: false,
			paths: data.paths
		}
		updateCurrentPaths();
	});
	$scope.pathClick = function (id) {
		console.log("pathClick");
		for (var i = 0; i <= $scope.adventure.paths.length - 1; i++) {
			if ($scope.adventure.paths[i].id === id) {
				$scope.adventure.currentPath = id;
				$scope.adventure.currentPathDescription = $scope.adventure.paths[i].pathResult;
				if ($scope.adventure.paths[i].death) {
					$scope.adventure.playerAlive = false;
				} else if ($scope.adventure.currentPath === $scope.adventure.winnngRound) {
					$scope.adventure.hasWon = true;
				} else if (!$scope.adventure.paths[i].goToNextRound) {
					for (var j = 0; j <= $scope.adventure.currentPaths.length - 1; j++) {
						if($scope.adventure.currentPaths[j].id == $scope.adventure.currentPath) {
							$scope.adventure.currentPaths.splice(j, 1);
						}
					};
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
		$scope.adventure.currentPath = 0;
		$scope.adventure.currentPathDescription = '';
		updateCurrentPaths();
	}
});