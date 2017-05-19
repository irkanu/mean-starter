angular.module('MyApp', ['ngRoute', 'satellizer', 'ui.bootstrap'])
    .config(["$routeProvider", "$locationProvider", "$authProvider", function ($routeProvider, $locationProvider, $authProvider) {
        skipIfAuthenticated.$inject = ["$location", "$auth"];
        loginRequired.$inject = ["$location", "$auth"];
        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html'
            })
            .when('/contact', {
                templateUrl: 'views/contact/contact.html',
                controller: 'ContactCtrl'
            })
            .when('/login', {
                templateUrl: 'views/login/login.html',
                controller: 'LoginCtrl',
                resolve: {skipIfAuthenticated: skipIfAuthenticated}
            })
            .when('/signup', {
                templateUrl: 'views/signup/signup.html',
                controller: 'SignupCtrl',
                resolve: {skipIfAuthenticated: skipIfAuthenticated}
            })
            .when('/account', {
                templateUrl: 'views/profile/profile.html',
                controller: 'ProfileCtrl',
                resolve: {loginRequired: loginRequired}
            })
            .when('/forgot', {
                templateUrl: 'views/forgot/forgot.html',
                controller: 'ForgotCtrl',
                resolve: {skipIfAuthenticated: skipIfAuthenticated}
            })
            .when('/reset/:token', {
                templateUrl: 'views/reset/reset.html',
                controller: 'ResetCtrl',
                resolve: {skipIfAuthenticated: skipIfAuthenticated}
            })
            .when('/org/:orgId', {
                templateUrl: 'views/org/org.html',
                // controller: 'OrgCtrl',
                resolve: {loginRequired: loginRequired}
            })
            .when('/org/:orgId/project/:projectId', {
                templateUrl: 'views/project/project.html',
                controller: 'ProjectCtrl',
                resolve: {loginRequired: loginRequired}
            })
            .otherwise({
                templateUrl: 'views/partials/404.html'
            });

        $authProvider.loginUrl = '/login';
        $authProvider.signupUrl = '/signup';

        function skipIfAuthenticated($location, $auth) {
            if ($auth.isAuthenticated()) {
                $location.path('/');
            }
        }

        function loginRequired($location, $auth) {
            if (!$auth.isAuthenticated()) {
                $location.path('/login');
            }
        }
    }])
    .run(["$rootScope", "$window", function ($rootScope, $window) {
        if ($window.localStorage.user) {
            $rootScope.currentUser = JSON.parse($window.localStorage.user);
        }
    }]);

angular.module('MyApp')
  .controller('ContactCtrl', ["$scope", "Contact", function($scope, Contact) {
    $scope.sendContactForm = function() {
      Contact.send($scope.contact)
        .then(function(response) {
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
  }]);

angular.module('MyApp')
  .controller('ForgotCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.forgotPassword = function() {
      Account.forgotPassword($scope.user)
        .then(function(response) {
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
  }]);

angular.module('MyApp')
  .controller('HeaderCtrl', ["$scope", "$location", "$window", "$auth", function($scope, $location, $window, $auth) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
    
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
    
    $scope.logout = function() {
      $auth.logout();
      delete $window.localStorage.user;
      $location.path('/');
    };
  }]);

angular.module('MyApp')
  .controller('LoginCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.login = function() {
      $auth.login($scope.user)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/account');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);

angular.module('MyApp')
    .controller('OrgCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "$routeParams", "Org", function ($scope, $rootScope, $location, $window, $auth, $routeParams, Org) {

        $scope.editingOrgName = false;

        $scope.init = function () {
            $scope.getCurrentOrg();
        };

        $scope.$on('currentOrg', function (event, org) {
            $scope.currentOrgSnapshot = angular.copy(org);
        });

        $scope.renameCurrentOrg = function () {

            $scope.editingOrgName = false;

            // Make sure the name isn't empty first.
            if ($scope.currentOrg.name.length < 1) {
                $scope.messages = {
                    error: [{
                        msg: 'Organization name cannot be blank!'
                    }]
                };
                $scope.editingOrgName = true;

                // No need to hit the server if we there is no name.
                return false;
            }

            // Only need to rename if the name actually changed. :)
            if ($scope.currentOrg.name !== $scope.currentOrgSnapshot.name) {
                Org.renameOrg($scope.currentOrg)
                    .then(function (response) {
                        $scope.currentOrg = response.data.org;
                        $scope.currentOrgSnapshot = $scope.currentOrg;
                        $scope.messages = {
                            success: [response.data]
                        };
                    })
                    .catch(function (response) {
                        $scope.messages = {
                            error: Array.isArray(response.data) ? response.data : [response.data]
                        };
                    });
            }
        };

        $scope.revertRename = function () {
            $scope.editingOrgName = false;
            $scope.currentOrg.name = $scope.currentOrgSnapshot.name;
        };

        $scope.getCurrentOrg = function () {
            Org.getOrgById($routeParams.orgId)
                .then(function (response) {
                    $scope.currentOrg = response.data;
                    $scope.$broadcast('currentOrg', $scope.currentOrg);
                })
                .catch(function (response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                })
        };

        $scope.init();

    }]);

angular.module('MyApp')
    .controller('OrgProjectsCtrl', ["$scope", "Project", function ($scope, Project) {

        $scope.init = function () {
        };

        $scope.createProject = function () {
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
                })
                .catch(function (response) {
                    $scope.messages = {
                        error: Array.isArray(response.data) ? response.data : [response.data]
                    };
                });
        };

        $scope.init();

    }]);

angular.module('MyApp')
    .controller('OrgSettingsCtrl', ["$scope", "$rootScope", "$window", "Org", "Account", function ($scope, $rootScope, $window, Org, Account) {

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

    }]);

angular.module('MyApp')
  .controller('ProfileCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", "Account", "Org", function($scope, $rootScope, $location, $window, $auth, Account, Org) {
    $scope.profile = $rootScope.currentUser;

    $scope.updateProfile = function() {
      Account.updateProfile($scope.profile)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
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

    $scope.createOrg = function() {
      Org.createOrg($scope.org)
        .then(function(response){
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
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

    $scope.changePassword = function() {
      Account.changePassword($scope.profile)
        .then(function(response) {
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

    $scope.link = function(provider) {
      $auth.link(provider)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $window.scrollTo(0, 0);
          $scope.messages = {
            error: [response.data]
          };
        });
    };
    $scope.unlink = function(provider) {
      $auth.unlink(provider)
        .then(function() {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };

    $scope.deleteAccount = function() {
      Account.deleteAccount()
        .then(function() {
          $auth.logout();
          delete $window.localStorage.user;
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: [response.data]
          };
        });
    };
  }]);
angular.module('MyApp')
  .controller('ProjectCtrl', ["$scope", "$rootScope", "$route", "$location", "$window", "$auth", "$routeParams", "Org", "Project", function($scope, $rootScope, $route, $location, $window, $auth, $routeParams, Org, Project) {

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
    
  }]);

angular.module('MyApp')
  .controller('ResetCtrl', ["$scope", "Account", function($scope, Account) {
    $scope.resetPassword = function() {
      Account.resetPassword($scope.user)
        .then(function(response) {
          $scope.messages = {
            success: [response.data]
          };
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    }
  }]);

angular.module('MyApp')
  .controller('SignupCtrl', ["$scope", "$rootScope", "$location", "$window", "$auth", function($scope, $rootScope, $location, $window, $auth) {
    $scope.signup = function() {
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  }]);
angular.module('MyApp')
    .factory('Account', ["$http", function ($http) {
        return {
            updateProfile: function (data) {
                return $http.put('/account', data);
            },
            changePassword: function (data) {
                return $http.put('/account', data);
            },
            deleteAccount: function () {
                return $http.delete('/account');
            },
            forgotPassword: function (data) {
                return $http.post('/forgot', data);
            },
            resetPassword: function (data) {
                return $http.post('/reset', data);
            },
            refresh: function (data) {
                return $http.post('/account/refresh', data);
            }
        };
    }]);
angular.module('MyApp')
  .factory('Contact', ["$http", function($http) {
    return {
      send: function(data) {
        return $http.post('/contact', data);
      }
    };
  }]);
angular.module('MyApp')
    .factory('Org', ["$http", function ($http) {
        return {
            createOrg: function (data) {
                return $http.post('/org', data);
            },
            getOrgById: function (id) {
                return $http.post('/org/' + id);
            },
            updateGeneralOrgSettings: function (data) {
                return $http.put('/org', data);
            },
            renameOrg: function(data) {
                return $http.put('/org/rename', data);
            }
        };
    }]);
  
angular.module('MyApp')
    .factory('Project', ["$http", function ($http) {
        return {
            createProject: function (data) {
                return $http.post('/project', data);
            },
            getProjectById: function (id) {
                return $http.post('/project/' + id);
            }
        };
    }]);
