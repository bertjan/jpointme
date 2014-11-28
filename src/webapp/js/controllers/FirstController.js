(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$log', '$firebase', '$firebaseAuth', 'AuthenticationService', 'UserService', 'SessionService',
        function ($scope, $log, $firebase, $firebaseAuth, AuthenticationService, UserService, SessionService) {

            // Check if the user is already authenticated
            if (AuthenticationService.isAuthenticated()) {
                $scope.username = AuthenticationService.getUserName();
                $scope.userId = AuthenticationService.getUserId();
            } else {
                $scope.username = "anonymous";
                $scope.userId = "";
            }

            // Handler for authenticate button
            $scope.authenticate = function(provider) {
              AuthenticationService.authenticate(provider)
                  .then(function(authData) {
                    $log.debug(authData);
                    $scope.username = authData.github.displayName;
                  });
            };

            $scope.isAuthenticated = function() {
                return !angular.equals($scope.username, 'anonymous');
            }

            // Handler for logout button
            $scope.logout = function() {
              AuthenticationService.logout()
                  .then(function() {
                    $scope.username = "anonymous";
                  });
            };

            // Only perform user data sync when user id authenticated.
            if (AuthenticationService.isAuthenticated()) {
                UserService.addUser($scope.username, $scope.userId);
            }

            console.log(SessionService.getSessions());
        }
    ]);
}());


