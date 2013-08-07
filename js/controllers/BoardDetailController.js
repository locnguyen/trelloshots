(function() {
  TrelloShots.app.controller('BoardDetailController', [
      '$scope', '$routeParams', 'boardService', 'viewStateService', function($scope, $routeParams, boardService, viewStateService) {

    boardService.get($routeParams.boardId).then(function(board) {
      viewStateService.currentBoard = board;
    });
  }]);
}());