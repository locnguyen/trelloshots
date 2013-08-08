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
      }
    }
  }]);
}());