angular.module('MyApp')
  .factory('Org', function($http) {
    return {
      createOrg: function(data) {
      	return $http.post('/org', data);
      },
      getOrgById: function(id) {
      	return $http.post('/org/' + id);
      }
    };
  });
  