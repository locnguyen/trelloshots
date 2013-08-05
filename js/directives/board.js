(function() {
  TrelloShots.app.directive('board', [function() {
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