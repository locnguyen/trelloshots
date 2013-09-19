(function () {
    TrelloShots.app
        .directive('filterEditor', ['$compile', function ($compile) {
            return {
                restrict: 'EA',
                scope: {
                    filter: '='
                },
                link: function (scope, element, attrs) {
                    attrs.$observe('type', function (val) {
                        element.html('<' + val + ' filter="filter">');
                        $compile(element.contents())(scope)
                    });
                }
            }
        }])
        .directive('dateEditor', [function () {
            return {
                restrict: 'EA',
                template: '<input type="text" ui-date ng-model="filter.date" />',
                scope: {
                    filter: '='
                }
            }
        }])
        .directive('dateRangeEditor', [function () {
            return {
                restrict: 'EA',
                template: '<div class="dateRangeEditor"><input type="text" ui-date ng-model="filter.low" placeholder="Start">' +
                    '<input type="text" ui-date  ng-model="filter.high" placeholder="End"></div>',
                scope: {
                    filter: '='
                }
            }
        }])
        .directive('sliderEditor', [function () {
            return {
                restrict: 'EA',
                template: '<div class="numberSliderEditor"><span ng-bind="filter.low"></span>-<span ng-bind="filter.high">' +
                    '</span><div class="slider-range"></div></div>',
                scope: {
                    filter: '='
                },
                link: function (scope, el, attrs) {
                    el.find('.slider-range').slider({
                        range: !!scope.isRange,
                        min: scope.filter.rangeMin,
                        max: scope.filter.rangeMax,
                        values: [scope.filter.rangeMin, scope.filter.rangeMax],
                        slide: function (event, ui) {
                            scope.$apply(function () {
                                scope.filter.low = ui.values[0];
                                scope.filter.high = ui.values[1];
                            });
                        }
                    });
                }
            }
        }]);
}());