angular.module('MyApp')
    .controller('OrgListCtrl', function ($scope, $rootScope, $window, Account) {

        $scope.init = function () {
            $scope.refreshCurrentUser();
        };

        $scope.refreshCurrentUser = function () {
            Account.refresh($rootScope.currentUser)
                .then(function (response) {
                    console.log(response);
                    $rootScope.currentUser = response.data.user;
                    $window.localStorage.user = JSON.stringify(response.data.user);
                })
        };

        $scope.init();

    });
