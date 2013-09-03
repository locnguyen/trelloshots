(function() {
  TrelloShots.app.directive('filterSelector', [function() {
    return {
      templateUrl: '/partials/filterSelector.html',
      restrict: 'EA',
      controller: function($scope) {
        $scope.filters = [lastUpdated, dueDate];
      },
      link: function(scope, el, attrs) {
        el.find('.collapse').collapse();
      }
    }
  }]);

  var Filter = function(options) {
    this.name = options.name;
    this.desc = options.desc;
  }


  var lastUpdated = new Filter({
    name: 'lastUpdated',
    desc: 'Last Updated',
    type: 'date',
    iterator: function(card, startDate, endDate) {
      var lastActivity = new Date(card.dateLastActivity);
      lastActivity.setHours(0, 0, 0, 0);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(0, 0, 0, 0);

      return startDate <= lastActivity && lastActivity <= endDate;
    }
  });

  var dueDate = new Filter({
    name: 'dueDate',
    desc: 'Due Date',
    type: 'date',
    iterator: function(card, date) {
      var dueDate = new Date(card.due);
      dueDate.setHours(0, 0, 0, 0);
      date.setHours(0, 0, 0, 0);
      return dueDate === date;
    }
  });
}());

