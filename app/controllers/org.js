angular.module('MyApp')
    .controller('OrgCtrl', function ($scope, $rootScope, $location, $window, $auth, $routeParams, $uibModal, $log, Org) {

        $scope.editingOrgName = false;
        $scope.animationsEnabled = true;

        $scope.init = function () {
            $scope.getCurrentOrg();
        };

        $scope.$on('currentOrg', function (event, org) {
            $scope.currentOrgSnapshot = angular.copy(org);
        });

        $scope.renameCurrentOrg = function () {

            $scope.editingOrgName = false;

            // Make sure the name isn't empty first.
            if ($scope.currentOrg.name.length < 1) {
                $scope.messages = {
                    error: [{
                        msg: 'Organization name cannot be blank!'
                    }]
                };
                $scope.editingOrgName = true;

                // No need to hit the server if we there is no name.
                return false;
            }

            // Only need to rename if the name actually changed. :)
            if ($scope.currentOrg.name !== $scope.currentOrgSnapshot.name) {
                Org.renameOrg($scope.currentOrg)
                    .then(function (response) {
                        $scope.currentOrg = response.data.org;
                        $scope.currentOrgSnapshot = $scope.currentOrg;
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

        $scope.revertRename = function () {
            $scope.editingOrgName = false;
            $scope.currentOrg.name = $scope.currentOrgSnapshot.name;
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

        $scope.createProject = function () {
            $scope.createProjectModalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: 'views/partials/createProjectModal.html',
                controller: 'CreateProjectModal',
                resolve: {
                    currentOrg: function () {
                        return $scope.currentOrg;
                    }
                }
            });

            $scope.createProjectModalInstance.result.then(function (success) {
                $scope.messages = success.msg;
                $scope.currentOrg = success.org;
            }, function (close) {});
        };

        $scope.init();

    });
