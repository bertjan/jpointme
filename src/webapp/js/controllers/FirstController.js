(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$firebase', '$firebaseAuth', '$timeout',
        function ($scope, $firebase, $firebaseAuth, $timeout) {

            var ref = new Firebase("https://jpointme.firebaseio.com/");
            $scope.username = "anonymous";

            // Use timeout to prevent the synchronous call to hold the controller initialization
            $timeout(function () {

                var auth = $firebaseAuth(ref);
                console.log('loading controller', auth.$getAuth());

                if (!auth.$getAuth()) {

                    auth.$authWithOAuthPopup("github").then(function (authData) {
                        console.log("Logged in as:", authData.github.displayName);

                        $scope.username = authData ? authData.github.displayName : "anonymous";

                    }).catch(function (error) {
                        console.error("Authentication failed: ", error);
                    });
                } else {
                    $scope.username = auth.$getAuth().github.displayName;
                }

            }, 10);
        }
    ]);
}());
