angular.module('MyApp')
    .controller('OrgProjectsCtrl', function($scope, Project) {

        $scope.init = function() {};

        $scope.createProject = function() {
        	const data = {
        		project: $scope.project,
        		org: $scope.currentOrg
        	};
	      Project.createProject(data)
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
