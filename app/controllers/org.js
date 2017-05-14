angular.module('MyApp')
  .controller('OrgCtrl', function($scope, $rootScope, $location, $window, $auth, $routeParams, Org) {

    $scope.init = function() {
      $scope.getCurrentOrg();
    };

    $scope.getCurrentOrg = function() {
      Org.getOrgById($routeParams.id)
        .then(function(response){
          $scope.currentOrg = response.data;
        })
        .catch(function(response){
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        })
    };

    $scope.init();
    
  });
