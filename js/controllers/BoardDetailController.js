(function() {
  TrelloShots.app.controller('BoardDetailController', [
      '$scope', '$routeParams', 'boardService', function($scope, $routeParams, boardService) {

    boardService.get($routeParams.boardId).then(function(data) {
      $scope.viewState.currentBoard = data;
    });
  }]);
}());