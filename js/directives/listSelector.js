(function() {
   TrelloShots.app.directive('listSelector', ['boardService', 'viewStateService', 'configService',
     function(boardService, viewStateService, configService) {
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
           var config = configService.board(board.id);
           if (scope.isSelectedList(board, list)) {
              config.removeSelectedList(list.id);

           }
           else {
             config.addSelectedList(list.id);
           }

           var selectedLists = _.filter(scope.board.lists, function(l) {
              return scope.isSelectedList(scope.board, l);
           });

           scope.selectedListNames = _.pluck(selectedLists, 'name').join(', ');
         }

         scope.isSelectedList = function(board, list) {
           var config = configService.board(board.id);
           if (config)
              return configService.board(board.id).isSelectedList(list.id);
           else
              return false;
         }

         /* Added to handle clicking the close button in a modal in Bootstrap 3 RC2. After clicking a button the close
          * button doesn't close anymore.
          */
         scope.closeModal = function() {
           $('#col-selector-' + scope.board.id).modal('hide');
         }
       }
     }
   }]);
}());