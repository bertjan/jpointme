(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$log', '$firebase', '$firebaseAuth', 'AuthenticationService', 'UserService',
        function ($scope, $log, $firebase, $firebaseAuth, AuthenticationService, UserService) {

            if (AuthenticationService.isAuthenticated()) {
                $scope.username = AuthenticationService.getUserName();
                $scope.userId = AuthenticationService.getUserId();
            } else {
                $scope.username = "anonymous";
                $scope.userId = "";
            }

            $scope.authenticate = function(provider) {
              AuthenticationService.authenticate(provider)
                  .then(function(authData) {
                    $log.debug(authData);
                    $scope.username = authData.github.displayName;
                  });
            };

            $scope.logout = function() {
              AuthenticationService.logout()
                  .then(function() {
                    $scope.username = "anonymous";
                  });
            };

            // Only perform user data sync when user id authenticated.
            if (AuthenticationService.isAuthenticated()) {

                var users = UserService.getUsers()
                var userExists = false;

                users.$asArray()
                    .$loaded()
                    .then(function (data) {
                        angular.forEach(data, function (user, index) {
                            if (user.oAuthId === $scope.userId) {
                                userExists = true;
                            }
                        })
                    }).then(function (data) {
                        if (!userExists) {
                            users.$push({name: $scope.username, oAuthId: $scope.userId}).then(function (newChildRef) {
                                console.log('user with userId ' + $scope.userId + ' does not exist; adding');
                            });
                        } else {
                            console.log('user with userId ' + $scope.userId + ' already exists; not adding.');
                        }
                    });
            }
        }
    ]);
}());


