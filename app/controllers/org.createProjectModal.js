angular.module('MyApp')
    .controller('CreateProjectModal', function ($scope, $uibModalInstance, currentOrg, Project) {

        $scope.currentOrg = currentOrg;
        $scope.submitting = false;

        $scope.createProject = function () {
            $scope.submitting = true;
            const data = {
                project: $scope.project,
                org: $scope.currentOrg
            };
            Project.createProject(data)
                .then(function (response) {
                    $scope.currentOrg = response.data.org;
                    $scope.messages = {
                        success: [response.data]
                    };
                    $uibModalInstance.close({msg: $scope.messages, org: $scope.currentOrg});
                })
                .catch(function (response) {
                    $scope.submitting = false;
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('jk');
        };

    });
