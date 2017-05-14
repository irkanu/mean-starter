angular.module('MyApp')
  .controller('OrgCtrl', function($scope, $location, $window, $auth, $routeParams, Org) {

    $scope.init = function() {
      // $scope.getOrg();
    }

    // $scope.getOrg = function() {
    //   Org.getOrg($routeParams.id)
    //     .then(function(response){
    //       console.log('OrgCtrl.getOrg() : ', response);
    //       $scope.currentOrg = response.data;
    //     })
    //     .catch(function(response){
    //       $scope.messages = {
    //         error: Array.isArray(response.data) ? response.data : [response.data]
    //       };
    //     })
    // }


    $scope.init();
    
  });
