angular.module('j.point.me').factory('UserService', ['$firebase',
    function ($firebase) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");


        function getUsers() {
            return $firebase(ref.child("users"));
        }

        return {
            getUsers: getUsers
        }

    }]);