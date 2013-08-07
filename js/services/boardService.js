(function() {
  TrelloShots.app.factory('boardService', ['$http', 'api', function($http, api) {
    return {
      all: function() {
        var fields = '&fields=name,url,shortLink,dateLastActivity';
        var url = api.url('https://trello.com/1/members/my/boards/pinned') + fields;
        return $http.get(url).then(function(response) { return response.data; });
      },

      get: function(boardId) {
        var fields = '&fields=name,desc,url,labelNames&members=all';
        var url = api.url('https://trello.com/1/boards/' + boardId) + fields;
        return $http.get(url).then(function(response) { return response.data; });
      },

      lists: function(boardId) {
        var url = api.url('https://trello.com/1/boards/' + boardId + '/lists');
        return $http.get(url).then(function(response) { return response.data; });
      }
    }
  }]);
}());