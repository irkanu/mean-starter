angular.module('MyApp')
    .factory('Project', function ($http) {
        return {
            createProject: function (data) {
                return $http.post('/project', data);
            }
        };
    });
