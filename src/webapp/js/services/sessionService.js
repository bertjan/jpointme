angular.module('j.point.me').factory('SessionService', ['$firebase',
    function ($firebase) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");

        /**
         * Returns the all the sessions that are stored in firebase.
         */
        function getSessions() {
            return $firebase(ref.child("sessions")).$asArray();
        }

        return {
            getSessions: getSessions
        }

    }]);