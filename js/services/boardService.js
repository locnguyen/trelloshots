(function() {
  TrelloShots.app.factory('boardService', ['$http', 'api', function($http, api) {
    return {
      get: function() {
        return $http.get(api.url('https://trello.com/1/members/my/boards/pinned'))
          .then(function(response) { return response.data });
      }
    }
  }]);
}());