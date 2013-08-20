(function() {
  TrelloShots.app.directive('topNav', ['$location', 'viewStateService', function($location, viewStateService) {
    return {
      restrict: 'E',
      templateUrl: '/partials/topNav.html',
      link: function(scope, el) {
        scope.showBoard = function(board, e) {
          $location.search('selectedListIds', null);
          $location.search('selectedColumns', null);
          $location.path('/board/' + board.id);
        }

        scope.$watch(
          function() { return viewStateService.currentBoard; },
          function(newBoard) { scope.currentBoard = newBoard; }
        );
      }
    }
  }]);
}());