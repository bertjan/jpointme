(function () {
  'use strict';

  angular.module('j.point.me').controller('FirstController', ['$scope', '$firebase', '$firebaseAuth',
    function ($scope, $firebase, $firebaseAuth) {

      var ref = new Firebase("https://jpointme.firebaseio.com/");

      $scope.username = "anonymous";
      var auth = ref.getAuth();
      if (!auth) {
        var auth = $firebaseAuth(ref);
        auth.$authWithOAuthRedirect("github").then(function(authData) {
          console.log("Logged in as:", authData);

        }).catch(function(error) {
          console.error("Authentication failed: ", error);
        });
      }

      $scope.username = auth ? auth.github.displayName : "anonymous";

      // create an AngularFire reference to the data
      var sync = $firebase(ref);
      // download the data into a local object
      $scope.data = sync.$asObject();
    }
  ]);
}());
