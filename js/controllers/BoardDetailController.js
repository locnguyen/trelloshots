(function() {
  TrelloShots.app.controller('BoardDetailController', [
      '$scope', '$routeParams', 'boardService', 'viewStateService', function($scope, $routeParams, boardService, viewStateService) {

    boardService.get($routeParams.boardId).then(function(board) {

      $scope.viewState.currentBoard = board;
      viewStateService.currentBoard = board
    });
  }]);
}());