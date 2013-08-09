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
            $scope.selectedListIds = $scope.boardConfig.selectedListIds();
            listService.cards($scope.selectedListIds).then(function(cards) {
              $scope.cards = cards;
            });
          }
        }
      );

      $scope.$watch(
        function() { return $scope.boardConfig && _.size($scope.boardConfig.selectedColumns()); },
        function() {
          if ($scope.boardConfig) {
            $scope.selectedColumns = $scope.boardConfig.selectedColumns();
            $scope.columnDefinitions = _.filter(listService.cardColumnDefinitions(), function(c) {
              return _.contains($scope.selectedColumns, c.field);
            });
          }
          else {
            $scope.columnDefinitions = [];
          }
        }
      );

      $scope.gridOptions = { data: 'cards', columnDefs: 'columnDefinitions' };
  }]);
}());