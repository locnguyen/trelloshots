(function () {
  TrelloShots.app.factory('configService', ['$location', '$rootScope', '$routeParams', function ($location, $rootScope, $routeParams) {
    var boardConfigs = [];

    return {
      board: function (boardId) {
        var config = _.find(boardConfigs, function (c) {
          return c.id === boardId;
        });

        if (!config) {
          config = new BoardConfig({
            boardId: boardId,
            selectedListIds: this.selectedListIdsFromParam(),
            selectedColumns: this.selectedColumnsFromParam(),
            $location: $location,
            $rootScope: $rootScope
          });
          boardConfigs.push(config);
          return config;
        }

        return config;
      },

      selectedListIdsFromParam: function () {
        if (!$routeParams.selectedListIds) return [];
        return $routeParams.selectedListIds;
      },

      selectedColumnsFromParam: function () {
        if (!$routeParams.selectedColumns) return [];
        return $routeParams.selectedColumns;
      }
    }
  }]);

  function BoardConfig(params) {
    var $location = params.$location, $rootScope = params.$rootScope, that = this;

    this.selectedListIds = params.selectedListIds || [];
    this.selectedColumns = params.selectedColumns || [];
    this.id = params.boardId;

    $rootScope.$watch(
      function () {
        return that.selectedListIds.length;
      },
      function () {
        $location.search('selectedListIds', that.selectedListIds);
      }
    );

    $rootScope.$watch(
      function () {
        return that.selectedColumns.length;
      },
      function () {
        $location.search('selectedColumns', that.selectedColumns);
      }
    );

    this.addSelectedList = function (listId) {
      this.selectedListIds.push(listId)
      this.selectedListIds = _.uniq(this.selectedListIds);
    }

    this.removeSelectedList = function (listId) {
      this.selectedListIds = _.filter(this.selectedListIds, function (id) {
        return listId !== id;
      });
    }

    this.isSelectedList = function (listId) {
      return _.contains(this.selectedListIds, listId);
    }

    this.addSelectedColumn = function (column) {
      this.selectedColumns.push(column);
      this.selectedColumns = _.compact(_.uniq(this.selectedColumns));
    }

    this.removeSelectedColumn = function (column) {
      this.selectedColumns = _.filter(this.selectedColumns, function (c) {
        return c !== column;
      });
    }

    this.isSelectedColumn = function (column) {
      return _.contains(this.selectedColumns, column);
    }
  }
}());