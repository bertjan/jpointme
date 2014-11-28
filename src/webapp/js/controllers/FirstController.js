(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$log', '$firebase', '$firebaseAuth', 'AuthenticationService',
        function ($scope, $log, $firebase, $firebaseAuth, AuthenticationService) {

            var ref = new Firebase("https://jpointme.firebaseio.com/");
            var auth = $firebaseAuth(ref);

            var authData = auth.$getAuth();
            if (authData) {
                $scope.username = authData.github.displayName;
                $scope.userId = authData.auth.provider + '/' + authData.auth.uid;
            } else {
                $scope.username = "anonymous";
                $scope.userId = "";
            }
            
            $scope.authenticate = function(provider) {
              AuthenticationService.authenticate(ref, provider)
                  .then(function(authData) {
                    $log.debug(authData);
                    $scope.username = authData.github.displayName;
                  });
            };

            $scope.logout = function() {
              AuthenticationService.logout(ref)
                  .then(function() {
                    $scope.username = "anonymous";
                  });
            };

            // Only perform user data sync when user id authenticated.
            if (auth.$getAuth()) {

                var users = $firebase(ref.child("users"));
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


