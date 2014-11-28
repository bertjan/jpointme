(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$log', '$firebase', '$firebaseAuth', 'AuthenticationService', 'UserService', 'SessionService', 'MessageService',
        function ($scope, $log, $firebase, $firebaseAuth, AuthenticationService, UserService, SessionService, MessageService) {

            $scope.input =
            {
                currentMessage: ""
            };

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


            $scope.sendCurrentMessage = function() {
                $log.debug("try posting current message: " + $scope.input.currentMessage);
                MessageService.postMessageToSession('session1', $scope.input.currentMessage);
                $scope.input.currentMessage = "";
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

            var sessionId = 'session1';
            SessionService.getSession(sessionId)
                .$loaded()
                .then(function(data) {
                    $scope.sessionName = data.name;
                });

            $scope.messages = MessageService.getMessagesForSession('session1');

            // Watch for new messages. Is this required ???
            $scope.messages.$watch(function () {
                var div = $('#messages');
                div.scrollTop(div[0].scrollHeight);
            });
        }
    ]);
}());


