angular.module('j.point.me').factory('SessionService', ['$firebase',
    function ($firebase) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");

        return {

            /**
             * Returns the all the sessions that are stored in firebase.
             */
            getSessions: function () {
                return $firebase(ref.child("sessions")).$asArray();
            },

            getSession: function(sessionId){
                return $firebase(ref.child("sessions").child(sessionId)).$asObject();
            }

        }
    }
]);