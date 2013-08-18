(function() {
  TrelloShots.app.directive('cardColSelector', ['boardService', 'listService', 'viewStateService', 'configService',
      function(boardService, listService, viewStateService, configService) {

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
          var config = configService.board(scope.board.id);
          scope.isColumnSelected(column) ? config.removeSelectedColumn(column) : config.addSelectedColumn(column);
        }

        scope.isColumnSelected = function(column) {
          if (scope.board) {
            return configService.board(scope.board.id).isSelectedColumn(column);
          } else {
            return false;
          }
        }

        /* Added to handle clicking the close button in a modal in Bootstrap 3 RC2. After clicking a button the close
         * button doesn't close anymore.
         */
        scope.closeModal = function() {
            $('#col-selector-' + scope.board.id).modal('hide');
        }

        scope.columns = listService.cardColumnDefinitions();
      }
    }
  }]);
}());