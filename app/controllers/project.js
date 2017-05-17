angular.module('MyApp')
  .controller('ProjectCtrl', function($scope, $rootScope, $route, $location, $window, $auth, $routeParams, Org, Project) {

    $scope.init = function() {
      $scope.getCurrentProject();
      $scope.getCurrentOrg();
    };

    $scope.getCurrentOrg = function() {
      Org.getOrgById($routeParams.orgId)
        .then(function(response){
          $scope.currentOrg = response.data;
        })
        .catch(function(response){
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    };

    $scope.getCurrentProject = function() {
      Project.getProjectById($routeParams.projectId)
        .then(function(response){
          $scope.currentProject = response.data;
        })
        .catch(function(response){
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    };

    $scope.init();
    
  });
