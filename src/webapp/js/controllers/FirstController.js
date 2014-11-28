(function () {
  'use strict';

  angular.module('j.point.me').controller('FirstController', ['$scope', '$firebase',
    function ($scope, $firebase) {

      $scope.text = "Hello world.";

      var ref = new Firebase("https://jpointme.firebaseio.com/");
      // create an AngularFire reference to the data
      var sync = $firebase(ref);
      // download the data into a local object
      $scope.data = sync.$asObject();
    }
  ]);
}());
