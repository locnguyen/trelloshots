(function() {
  TrelloShots.app.directive('board', ['boardService', function(boardService) {
    return {
      restrict: 'E',
      scope: {
        board: '='
      },
      link: function(scope, el, attrs) {

      }
    }
  }]);
}());