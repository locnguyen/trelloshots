(function() {
  TrelloShots.app.factory('userService', ['$http', 'api', function($http, api) {
    return {
      get: function() {
        return $http.get(api.url('https://trello.com/1/members/me'))
          .then(function(data) {
            return data.data;
          });
      }
    }
  }]);
}());