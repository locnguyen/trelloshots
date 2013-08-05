(function() {
  TrelloShots.app.directive('topNav', ['$location', function($location) {
    return {
      restrict: 'E',
      templateUrl: '/partials/topNav.html',
      link: function(scope, el) {
        scope.showBoard = function(board, e) {
          $(e.target).data('loading-text', 'Loading...');
          $location.path('/board/' + board.id);
        }
      }
    }
  }]);
}());