(function () {
    TrelloShots.app.directive('filterSelector', [function () {
        return {
            templateUrl: '/partials/filterSelector.html',
            restrict: 'EA',
            controller: function ($scope) {
                $scope.filters = [lastUpdated, dueDate, voteCount];
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


    var DateRangeFilter = function (hash) {
        this.editor = 'date-range-editor';

        if (hash) {
            Filter.call(this, hash);
            this.start = hash.start;
            this.end = hash.end;
        }
    }
    DateRangeFilter.prototype = new Filter();


    var NumberRangeFilter = function (hash) {
        this.editor = 'slider-editor';
        this.isRange = true;

        if (hash) {
            Filter.call(this, hash);
            this.low = hash.low;
            this.high = hash.high;
            this.rangeMin = hash.rangeMin;
            this.rangeMax = hash.rangeMax;
        }
    }
    NumberRangeFilter.prototype = new Filter();


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

    var voteCount = new NumberRangeFilter({
        name: 'voteCount',
        desc: 'Vote Count',
        rangeMin: 0,
        rangeMax: 100,
        iterator: function (card, low, high) {
            return card.badges.votes > low && card.badges.votes < high;
        }
    });
}());

