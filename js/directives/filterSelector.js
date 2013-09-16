(function () {
    TrelloShots.app.directive('filterSelector', [function () {
        return {
            templateUrl: '/partials/filterSelector.html',
            restrict: 'EA',
            controller: function ($scope) {
                $scope.filters = [lastUpdated, dueDate];
            },
            link: function (scope, el, attrs) {
                el.find('.collapse').collapse();
            }
        }
    }]);

    var Filter = function (hash) {
        if (hash) {
            this.name = hash.name;
            this.desc = hash.desc;
            this.iterator = hash.iterator;
        }
    }

    var DateFilter = function (hash) {
        this.editor = 'date-editor';

        if (hash) {
            Filter.call(this, hash);
            this.date = hash.date;
        }
    }

    DateFilter.prototype = new Filter();

    var DateRangeFilter = function(hash) {
        this.editor = 'date-range-editor';

        if (hash) {
            Filter.call(this, hash);
            this.start = hash.start;
            this.end = hash.end;
        }
    }

    DateRangeFilter.prototype = new Filter();


    var lastUpdated = new DateRangeFilter({
        name: 'lastUpdated',
        desc: 'Last Updated',
        iterator: function (card, startDate, endDate) {
            var lastActivity = new Date(card.dateLastActivity);
            lastActivity.setHours(0, 0, 0, 0);
            startDate.setHours(0, 0, 0, 0);
            endDate.setHours(0, 0, 0, 0);

            return startDate <= lastActivity && lastActivity <= endDate;
        }
    });

    var dueDate = new DateFilter({
        name: 'dueDate',
        desc: 'Due Date',
        iterator: function (card, date) {
            var dueDate = new Date(card.due);
            dueDate.setHours(0, 0, 0, 0);
            date.setHours(0, 0, 0, 0);
            return dueDate === date;
        }
    });
}());

