(function () {
  TrelloShots.app
      .directive('dateRangeEditor', [function () {
        return {
          restrict: 'EA',
          template: '<div class="dateRangeEditor"><input type="text" ui-date ng-model="start" placeholder="Start">' +
              '<input type="text" ui-date  ng-model="end" placeholder="End"></div>',
          scope: {
            start: '=',
            end: '='
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