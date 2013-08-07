(function() {
  TrelloShots.app.directive('topNav', ['$location', 'viewStateService', function($location, viewStateService) {
    return {
      restrict: 'E',
      templateUrl: '/partials/topNav.html',
      link: function(scope, el) {
        scope.showBoard = function(board, e) {
          $(e.target).data('loading-text', 'Loading...');
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