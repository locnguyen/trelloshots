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

         scope.toggleList = function(list) {
           list.isSelected = !list.isSelected;
           list.isSelected ? viewStateService.selectList(list.id) : viewStateService.deselectList(list.id);
         }
       }
     }
   }]);
}());