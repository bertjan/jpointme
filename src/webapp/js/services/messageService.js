angular.module('j.point.me').factory('MessageService', ['$firebase',
    function ($firebase) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");

        return {

            /**
             * Returns all the sessions that are stored in firebase.
             */
            getMessages: function () {
                return $firebase(ref.child("messages")).$asArray();
            },

            /**
             * Returns all the messages for a specific session.
             */
            getMessagesForSession: function(sessionId) {
                var allMessagesPerSession = $firebase(ref.child("messages")).$asArray();

                allMessagesPerSession.$loaded().then(function() {

                    angular.forEach(allMessagesPerSession, function(session) {
                       if (session.$id === sessionId) {
                           return session;
                       }
                    });

                });

                return allMessagesPerSession;
            }
        }
    }
]);