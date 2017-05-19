angular.module('MyApp')
    .controller('OrgCtrl', function ($scope, $rootScope, $location, $window, $auth, $routeParams, Org) {

        $scope.editingOrgName = false;

        $scope.init = function () {
            $scope.getCurrentOrg();
        };

        $scope.$on('currentOrg', function (event, org) {
            $scope.currentOrgSnapshot = angular.copy(org);
        });

        $scope.renameCurrentOrg = function () {
            // Only need to rename if the name actually changed. :)
            if ($scope.currentOrg.name !== $scope.currentOrgSnapshot.name) {
                Org.renameOrg($scope.currentOrg)
                    .then(function (response) {
                        $scope.currentOrg = response.data.org;
                        $scope.messages = {
                            success: [response.data]
                        };
                    })
                    .catch(function (response) {
                        $scope.messages = {
                            error: Array.isArray(response.data) ? response.data : [response.data]
                        };
                    });
            }
        };

        $scope.getCurrentOrg = function () {
            Org.getOrgById($routeParams.orgId)
                .then(function (response) {
                    $scope.currentOrg = response.data;
                    $scope.$broadcast('currentOrg', $scope.currentOrg);
                })
                .catch(function (response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                })
        };

        $scope.init();

    });
