(function() {
  TrelloShots.app.controller('trelloShotsController',
    ['$scope', 'authService', 'userService', 'boardService',function($scope, authService, userService, boardService) {

    authService.authorizeWithStoredToken();

    $scope.$watch(
      function() { return authService.isAuthorized(); },
      function(isAuthorized) {
        $scope.isAuthorized = isAuthorized;

        if (isAuthorized) {
          $scope.user = userService.get().then(function(data) { return data; });
          $scope.boards = boardService.get().then(function(data) { return data; });
        }
        else {
          $scope.user = null;
          $scope.boards = [];
        }
      }
    )

    $scope.requestAuthorization = function() {
      authService.authorize();
    }

    $scope.requestDeauthorization = function() {
      authService.deauthorize();
    }
  }]);
}());