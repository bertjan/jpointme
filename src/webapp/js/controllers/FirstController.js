(function () {
    'use strict';

    angular.module('j.point.me').controller('FirstController', ['$scope', '$firebase', '$firebaseAuth', '$window',
        function ($scope, $firebase, $firebaseAuth, $window) {

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
                ref.unauth();
                $window.location.reload();
            };


            var users = $firebase(ref.child("users"));
            var userExists = false;

            users.$asArray()
              .$loaded()
              .then(function(data) {
                  angular.forEach(data,function(user,index){
                      if (user.oAuthId === $scope.userId) {
                          userExists = true;
                      }
                  })
              }).then(function(data) {
                  if (!userExists) {
                      users.$push({name: $scope.username, oAuthId: $scope.userId}).then(function(newChildRef) {
                          console.log('user with userId ' + $scope.userId + ' does not exist; adding');
                      });
                  } else {
                        console.log('user with userId ' + $scope.userId + ' already exists; not adding.');
                  }
              });


        }
    ]);
}());


