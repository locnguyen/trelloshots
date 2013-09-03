var TrelloShots = TrelloShots || {};

TrelloShots.API_KEY = 'efdb13875d22825e117d1c6518fa5739';

TrelloShots.app = angular.module('trelloShots', ['ngGrid', 'firebase', 'ui.date']);

(function () {
  TrelloShots.app.config(['$routeProvider', '$httpProvider', '$locationProvider',
    function ($routeProvider, $httpProvider, $locationProvider) {
      $routeProvider.
        when('/', { templateUrl: '/partials/index.html' }).
        when('/login', { templateUrl: '/partials/login.html' }).
        when('/dashboard', { templateUrl: '/partials/dashboard.html' }).
        when('/board/:boardId', {
          templateUrl: '/partials/boardDetail.html',
          controller: 'BoardDetailController',
          reloadOnSearch: false
        });


      // Trello doesn't like this header so nuke it
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

      $locationProvider.html5Mode(true).hashPrefix('!');
    }]);

  TrelloShots.app.run(['$rootScope', '$route', '$location', 'authService', function ($rootScope, $route, $location, authService) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
      if (!authService.isAuthorized()) {
        if (next.templateUrl === '/partials/index.html') {
          // do nothing, going to home page
        }
        else if (next.templateUrl === '/partials/login.html') {
          // do nothing, already going to login page
        }
        else {
          var nextRoute = $location.url();
          $location.search('redirectTo', nextRoute);
          $location.path('/login');
        }
      }
    });
  }]);
}());
