(function() {
  TrelloShots.app.factory('boardService', ['$http', 'api', 'configService', function($http, api, configService) {
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
          configService.board(response.data);
          return response.data;
        });
      },

      lists: function(boardId) {
        var url = api.url('https://trello.com/1/boards/' + boardId + '/lists');
        return $http.get(url).then(function(response) { return response.data; });
      }
    }
  }]);

  function BoardConfig(board) {
    var selectedListIds = [],
        selectedColumns = [];

    this.id = board.id;

    this.addSelectedList = function(listId) {
      selectedListIds.push(listId)
      selectedListIds = _.uniq(selectedListIds);
    }

    this.removeSelectedList = function(listId) {
      selectedListIds = _.filter(selectedListIds, function(id) { return listId !== id; });
    }

    this.isSelectedList = function(listId) {
      return _.contains(selectedListIds, listId);
    }

    this.selectedListIds = function() {
      return selectedListIds;
    }

    this.addSelectedColumn = function(column) {
      selectedColumns.push(column);
      selectedColumns = _.compact(_.uniq(selectedColumns));
    }

    this.removeSelectedColumn = function(column) {
      selectedColumns = _.filter(selectedColumns, function(c) { return c !== column; });
    }

    this.isSelectedColumn = function(column) {
      return _.contains(selectedColumns, column);
    }

    this.selectedColumns = function() {
      return selectedColumns;
    }
  }
}());