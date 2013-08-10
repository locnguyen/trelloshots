(function() {
  TrelloShots.app
    .directive('tooltip', function() {
       return {
         restrict: 'A',
         link: function(scope, el) {
           $(el).tooltip();
         }
       }
    });
}());