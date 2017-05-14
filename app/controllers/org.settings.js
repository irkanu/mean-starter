angular.module('MyApp')
    .controller('OrgSettingsCtrl', function ($scope, $rootScope, Org, Account) {

        $scope.init = function () {
            $scope.view_tab = 'general';
        };

        $scope.changeTab = function (tab) {
            $scope.view_tab = tab;
        };

        $scope.updateGeneralOrgSettings = function () {
            Org.updateGeneralOrgSettings($scope.currentOrg)
                .then(function (response) {
                    // A bit of magic happens here - we don't need to rebind currentOrg because it's bound by the parent org.
                    $scope.messages = {
                        success: [response.data]
                    };
                    // Refresh the currentUser object, so partials like the navigation have access to the new org data.
                    Account.refresh($rootScope.user)
                        .then(function (response) {
                            $rootScope.currentUser = response.data.user;
                            $window.localStorage.user = JSON.stringify(response.data.user);
                        })
                })
                .catch(function (response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.init();

    });
