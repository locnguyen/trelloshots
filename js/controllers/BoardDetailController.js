(function () {
  TrelloShots.app.controller('BoardDetailController', [
    '$scope', '$location', '$routeParams', 'boardService', 'viewStateService', 'listService', 'configService',
    function ($scope, $location, $routeParams, boardService, viewStateService, listService, configService) {

      $location.search('selectedListIds', null);
      $location.search('selectedColumns', null);

      boardService.get($routeParams.boardId).then(function (board) {
        viewStateService.currentBoard = board;
        $scope.boardConfig = configService.board(board.id);
        $location.search('selectedListIds', $scope.boardConfig.selectedListIds);
        $location.search('selectedColumns', $scope.boardConfig.selectedColumns);
      });

      $scope.$watch(
          function () {
            return $scope.boardConfig && _.size($scope.boardConfig.selectedListIds);
          },
          function () {
            if (!$scope.boardConfig) {
              $scope.cards = [];
            }
            else {
              $scope.selectedListIds = $scope.boardConfig.selectedListIds;
              listService.cards($scope.selectedListIds).then(function (cards) {
                $scope.cards = cards;
              });
            }
          }
      );

      $scope.$watch(
          function () {
            return $scope.boardConfig && _.size($scope.boardConfig.selectedColumns);
          },
          function () {
            if ($scope.boardConfig) {
              $scope.selectedColumns = $scope.boardConfig.selectedColumns;
              $scope.columnDefinitions = _.filter(listService.cardColumnDefinitions(), function (c) {
                return _.contains($scope.selectedColumns, c.field);
              });
            }
            else {
              $scope.columnDefinitions = [];
            }
          }
      );

      $scope.gridOptions = { data: 'cards', columnDefs: 'columnDefinitions' };

      $scope.member = function (idOrUsername) {
        return _.find($scope.currentBoard.members, function (m) {
          return m.id === idOrUsername || m.username === idOrUsername;
        })
      }

      $scope.pluckCardUsernames = function (idsOrUsernames) {
        var members = _.map(idsOrUsernames, function (id) {
          return $scope.member(id);
        });

        return _.pluck(members, 'username').join(', ');
      }

      $scope.pluckCardListName = function (id) {
        return _.find($scope.currentBoard.lists,function (l) {
          return l.id === id;
        }).name;
      }
    }]);
}());