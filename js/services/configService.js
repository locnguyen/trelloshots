(function() {
  TrelloShots.app.factory('configService', [function() {
    var boardConfigs = [];

    return {
      board: function(boardId) {
        var config = _.find(boardConfigs, function(c) { return c.id === boardId; });

        if (!config) {
          config = new BoardConfig(boardId);
          boardConfigs.push(config);
          return config;
        }

        return config;
      }
    }
  }]);

  function BoardConfig(boardId) {
    var selectedListIds = [],
      selectedColumns = [];

    this.id = boardId;

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