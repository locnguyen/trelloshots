(function() {
  TrelloShots.app.controller('TrelloShotsController',
    ['$scope', 'authService', 'userService', 'boardService',function($scope, authService, userService, boardService) {

    authService.authorizeWithStoredToken();

    $scope.viewState = {
      currentBoard: null
    };

    $scope.$watch(
      function() { return authService.isAuthorized(); },
      function(isAuthorized) {
        $scope.isAuthorized = isAuthorized;

        if (isAuthorized) {
          $scope.user = userService.get().then(function(data) { return data; });
          $scope.boards = boardService.all().then(function(data) { return data; });
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