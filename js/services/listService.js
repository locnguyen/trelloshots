(function() {
  TrelloShots.app.factory('listService', ['$http', '$q', 'api', function($http, $q, api) {
    function cardUrl(listId) {
      return api.url('https://trello.com/1/lists/' + listId + '/cards');
    }

    return {
      cards: function(listIds) {
        var requests = [];
        _.each(listIds, function(id) {
           requests.push($http.get(cardUrl(id)));
        });

        return $q.all(requests).then(function(response) {
          var cards = _.flatten(_.pluck(response, 'data'));
          return cards;
        });
      },

      cardColumnDefinitions: function() {
        return [
          {
            displayName: 'Name',
            field: 'name',
            cellTemplate: '<div class="ngCellText"><a ng-cell-text href="{{row.getProperty(\'url\')}}" ng-bind="row.getProperty(col.field)" target="_blank"></a></div>'
          },
          {
            displayName: 'Description',
            field: 'desc'
          },
          {
            displayName: 'Members',
            field: 'idMembers',
            cellTemplate: '<div class="ngCellText"><span ng-cell-text ng-bind="pluckCardUsernames(row.getProperty(col.field))"></span></div>'
          },
          {
            displayName: 'List',
            field: 'idList',
            cellTemplate: '<div class="ngCellText"><span  ng-cell-text ng-bind="pluckCardListName(row.getProperty(col.field))"></span></div>'
          },
          {
            displayName: 'Last Updated',
            field: 'dateLastActivity',
            cellTemplate: '<div class="ngCellText"><span ng-cell-text ng-bind="row.getProperty(col.field) | date:\'M/d/yy h:mm a\'"></span></div>'
          },
          {
            displayName: 'Due Date',
            field: 'due',
            cellTemplate: '<div class="ngCellText"><span ng-cell-text ng-bind="row.getProperty(col.field) | date:\'M/d/yy\'"></span></div>'
          },
          {
            displayName: 'Labels',
            field: 'labels'
          },
          {
            displayName: 'Closed',
            field: 'closed'
          }
        ]
      }
    }
  }]);
}());