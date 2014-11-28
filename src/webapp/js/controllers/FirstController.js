(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$log', '$firebase', '$firebaseAuth', 'AuthenticationService', 'UserService', 'SessionService', 'MessageService',
        function ($scope, $log, $firebase, $firebaseAuth, AuthenticationService, UserService, SessionService, MessageService) {

            // Check if the user is already authenticated
            if (AuthenticationService.isAuthenticated()) {
                $scope.user = AuthenticationService.getUser();
            } else {
                $scope.user = {
                    username: "anonymous",
                    userId: ""
                }

            }

            // Handler for authenticate button
            $scope.authenticate = function (provider) {
                AuthenticationService.authenticate(provider)
                        .then(function (user) {
                            $log.debug(user);
                            $scope.user = user;
                        });
            };

            $scope.isAuthenticated = function () {
                return AuthenticationService.isAuthenticated();
            };

            // Handler for logout button
            $scope.logout = function () {
                AuthenticationService.logout()
                        .then(function () {
                            $scope.user = {
                                username: "anonymous",
                                userId: ""
                            }
                        });
            };

            // Only perform user data sync when user id authenticated.
            if (AuthenticationService.isAuthenticated()) {
                UserService.addUser($scope.user.username, $scope.user.userId);
            }

            // Get all sessions:
            //console.log(SessionService.getSessions());

            // Pushing a message:
            // MessageService.postMessageToSession('session1', 'hello');

            // Get all messages:
            //console.log(MessageService.getMessagesForSession('session1'));

            $scope.messages = MessageService.getMessagesForSession('session1');

            // Watch for new messages. Is this required ???
            //$scope.messages.$watch(function () {
            //    console.log('message posted');
            //});
        }
    ]);
}());


