(function() {
   TrelloShots.app.directive('listSelector', ['boardService', 'viewStateService', function(boardService, viewStateService) {
     return {
       restrict: 'EA',
       replace: false,
       templateUrl: '/partials/listSelector.html',
       link: function(scope, el, attrs) {
         scope.$watch(
           function() {
             return viewStateService.currentBoard;
           }, function(board) {
             if (board) {
               scope.board = board;
               el.find('#list-selector-' + scope.board.id).modal({ show: false });
               boardService.lists(scope.board.id).then(function(lists) { scope.board.lists = lists; });
             }
         });

         scope.toggleList = function(board, list) {
           var config = boardService.getConfig(board.id);
           if (scope.isSelectedList(board, list)) {
              config.removeSelectedList(list.id);

           }
           else {
             config.addSelectedList(list.id);
           }
         }

         scope.isSelectedList = function(board, list) {
           return boardService.getConfig(board.id).isSelectedList(list.id);
         }
       }
     }
   }]);
}());