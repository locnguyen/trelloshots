(function() {
  TrelloShots.app.factory('memberService', ['$http', 'api', function($http, api) {
    return {
      get: function(idOrUsername) {
        var url = api.url('https://trello.com/1/' + idOrUsername);
        return $http(url).then(function(response) { return response.data; })
      }
    }
  }]);
}());