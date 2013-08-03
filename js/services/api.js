(function() {
  TrelloShots.app.factory('api', ['authService', function(authService) {
    function params() {
      return [
        'key=' + TrelloShots.API_KEY,
        'token=' + authService.userToken()
      ];
    }

    return {
      url: function(url) {
        return url + '?' + params().join('&');
      }
    }
  }]);
}())