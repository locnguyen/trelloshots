(function() {
  TrelloShots.app.factory('authService', ['$location', '$routeParams', '$rootScope', function($location, $routeParams, $rootScope) {
    return {
      userToken: function() {
        return Trello.token();
      },

      isAuthorized: function() {
        return Trello.authorized();
      },

      authorize: function() {
        Trello.authorize({
          type: 'popup',
          name: 'TrelloShots',
          success: function() {
            var redirect = $routeParams.redirectTo;
            if (redirect && redirect !== '') {
              $location.search('redirectTo', null);
              $location.path(redirect);
              $rootScope.$apply();
            }
            else {
              $location.path('/');
            }
          }
        });
      },

      authorizeWithStoredToken: function() {
        Trello.authorize({ interactive: false });
      },

      deauthorize: function() {
        Trello.deauthorize();
        $location.path('/');
      }
    }
  }]);
}());