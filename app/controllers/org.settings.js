angular.module('MyApp')
    .controller('OrgSettingsCtrl', function ($scope, Org) {

        $scope.init = function () {
            $scope.view_tab = 'general';
        };

        $scope.changeTab = function (tab) {
            $scope.view_tab = tab;
        };

        $scope.updateGeneralOrgSettings = function() {
            Org.updateGeneralOrgSettings($scope.currentOrg)
                .then(function(response){
                    $scope.currentOrg = response.data.org;
                    $scope.messages = {
                        success: [response.data]
                    };
                })
                .catch(function(response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.init();

    });
