(function () {
  TrelloShots.app
      .directive('filterEditor', ['$compile', function($compile) {
        return {
            restrict: 'EA',
            scope: {
                filter: '='
            },
            link: function(scope, element, attrs) {
                attrs.$observe('type', function(val) {
//                    var html = ['<' + val];
//                    switch(val) {
//                        case: 'date-editor'
//                            html.push('date=' + filter.)
//
//                    }



                    element.html('<' + val + ' filter="filter">');
                    $compile(element.contents())(scope)
                });
            }
        }
      }])
      .directive('dateEditor', [function() {
         return {
             restrict: 'EA',
             template: '<input type="text" ui-date ng-model="filter.date" />',
             scope: {
                filter: '='
             },
             link: function(scope, el, attrs) {

             }
         }
      }])
      .directive('dateRangeEditor', [function () {
        return {
          restrict: 'EA',
          template: '<div class="dateRangeEditor"><input type="text" ui-date ng-model="filter.start" placeholder="Start">' +
              '<input type="text" ui-date  ng-model="filter.end" placeholder="End"></div>',
          scope: {
            filter: '='
          },
          link: function (scope, el, attrs) {

          }
        }
      }])
      .directive('sliderEditor', [function () {
        return {
          restrict: 'EA',
          template: '<div class="numberSliderEditor"><div class="slider-range"></div></div>',
          scope: {
            start: '=',
            end: '='
          },
          link: function (scope, el, attrs) {
            el.find('.slider-range').slider({
              range: !!attrs.range,
              min: attrs.min,
              max: attrs.max,
              values: [attrs.min, attrs.max],
              slide: function (event, ui) {
                scope.$apply(function () {
                  scope.start = ui.values[0];
                  scope.end = ui.values[1];
                });
              }
            });
          }
        }
      }]);
}());