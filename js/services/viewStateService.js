(function() {
  TrelloShots.app.factory('viewStateService', [function() {
    var selectedLists = [];

    return {
      currentBoard: null,

      selectList: function(id) {
        selectedLists.push(id);
        selectedLists = _.uniq(selectedLists);
      },

      deselectList: function(id) {
        selectedLists = _.filter(selectedLists, function(listId) { return listId !== id; });
      },

      isSelected: function(id) {
        return _.contains(selectedLists, id);
      }
    }
  }]);
}() );