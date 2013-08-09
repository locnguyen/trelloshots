(function() {
  TrelloShots.app.directive('cardColSelector', ['boardService', 'listService', 'viewStateService',
      function(boardService, listService, viewStateService) {

    return {
      restrict: 'EA',
      replace: false,
      templateUrl: '/partials/cardColSelector.html',
      link: function(scope, el) {
        scope.$watch(
          function() { return viewStateService.currentBoard; },
          function(board) {
            scope.board = board;
          }
        );

        scope.toggleColumn = function(column) {
          var config = boardService.getConfig(scope.board.id);
          scope.isColumnSelected(column) ? config.removeSelectedColumn(column) : config.addSelectedColumn(column);
        }

        scope.isColumnSelected = function(column) {
          if (scope.board) {
            return boardService.getConfig(scope.board.id).isSelectedColumn(column);
          } else {
            return false;
          }
        }

        scope.columns = listService.cardColumnDefinitions();
      }
    }
  }]);
}());