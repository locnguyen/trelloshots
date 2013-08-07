(function() {
  TrelloShots.app.controller('BoardDetailController', [
      '$scope', '$routeParams', 'boardService', 'viewStateService', 'listService',
    function($scope, $routeParams, boardService, viewStateService, listService) {

      boardService.get($routeParams.boardId).then(function(board) {
        viewStateService.currentBoard = board;

        $scope.boardConfig = boardService.getConfig(board.id);
      });


      $scope.$watch(
        function() { return $scope.boardConfig && _.size($scope.boardConfig.selectedListIds()); },
        function() {
          if (!$scope.boardConfig) {
            $scope.cards = [];
          }
          else {
            listService.cards($scope.boardConfig.selectedListIds()).then(function(cards) {
              $scope.cards = _.map(cards, function(c) { return  _.pick(c, 'name', 'desc')});
            });
          }
        }
      );

      $scope.gridOptions = { data: 'cards' };

  }]);
}());