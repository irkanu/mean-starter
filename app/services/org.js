angular.module('MyApp')
  .factory('Org', function($http) {
    return {
      createOrg: function(data) {
      	return $http.post('/org', data);
      },
      getOrg: function(id) {
      	return $http.get('/org/' + id);
      };
    };
  });
  