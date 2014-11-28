(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$firebase', '$firebaseAuth',
        function ($scope, $firebase, $firebaseAuth) {

            var ref = new Firebase("https://jpointme.firebaseio.com/");
            var auth = $firebaseAuth(ref);

            if (auth.$getAuth()) {
               $scope.username = auth.$getAuth().github.displayName;
            } else {
                $scope.username = "anonymous";
            }

            $scope.authenticate = function (provider) {
                var auth = $firebaseAuth(ref);
                auth.$authWithOAuthPopup("github").then(function (authData) {
                    console.log("Logged in as:", authData);
                    $scope.username = authData.github.displayName;
                }).catch(function (error) {
                    console.error("Authentication failed: ", error);
                });
            };

            $scope.logout = function () {
                ref.unauth().then(function () {
                    $scope.username = "anonymous";
                });
            };
        }
    ]);
}());


