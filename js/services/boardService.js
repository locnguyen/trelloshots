(function() {
  TrelloShots.app.factory('boardService', ['$http', 'api', function($http, api) {
    var boardConfigs = [];

    function addBoardConfig(board) {
      var existingConfig = _.find(boardConfigs, function(c) {
         return c.id === board.id;
      });

      if (!existingConfig) boardConfigs.push(new BoardConfig(board));
    }

    return {
      all: function() {
        var fields = '&fields=name,url,shortLink,dateLastActivity';
        var url = api.url('https://trello.com/1/members/my/boards/pinned') + fields;
        return $http.get(url).then(function(response) { return response.data; });
      },

      get: function(boardId) {
        var fields = '&fields=name,desc,url,labelNames&members=all';
        var url = api.url('https://trello.com/1/boards/' + boardId) + fields;
        return $http.get(url).then(function(response) {
          addBoardConfig(response.data);
          return response.data;
        });
      },

      lists: function(boardId) {
        var url = api.url('https://trello.com/1/boards/' + boardId + '/lists');
        return $http.get(url).then(function(response) { return response.data; });
      },

      getConfig: function(boardId) {
        return _.find(boardConfigs, function(c) { return c.id === boardId; });
      }
    }
  }]);

  function BoardConfig(board) {
    var selectedListIds = [];
    this.id = board.id;

    this.addSelectedList = function(listId) {
      selectedListIds.push(listId);
    }

    this.removeSelectedList = function(listId) {
      selectedListIds = _.filter(selectedListIds, function(id) { return listId !== id; });
    }

    this.isSelected = function(listId) {
      return _.contains(selectedListIds, listId);
    }

    this.selectedListIds = function() {
      return selectedListIds;
    }
  }
}());