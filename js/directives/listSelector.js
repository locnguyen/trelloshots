(function() {
   TrelloShots.app.directive('listSelector', ['boardService', 'viewStateService', function(boardService, viewStateService) {
     return {
       restrict: 'EA',
       replace: false,
       templateUrl: '/partials/listSelector.html',
       link: function(scope, el, attrs) {
         scope.$watch('viewState.currentBoard', function(board) {
           if (board) {
             el.find('#list-selector-' + board.id).modal({ show: false });
             boardService.lists(board.id).then(function(lists) { board.lists = lists; });
           }
         });

         scope.toggleList = function(board, list) {
           var config = boardService.getConfig(board.id);
           if (scope.isSelected(board, list)) {
              config.removeSelectedList(list.id);
           }
           else {
             config.addSelectedList(list.id);
           }
         }

         scope.isSelected = function(board, list) {
           return boardService.getConfig(board.id).isSelected(list.id);
         }
       }
     }
   }]);
}());