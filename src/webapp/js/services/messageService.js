angular.module('j.point.me').factory('MessageService', ['$firebase', 'AuthenticationService',
    function ($firebase, AuthenticationService) {

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
                var allMessagesPerSession = $firebase(ref.child("messages").child(sessionId)).$asArray();
                return allMessagesPerSession;
            },

            /**
             * Posts a message to the specified session.
             */
            postMessageToSession: function(sessionId, text) {

                var messages = this.getMessagesForSession(sessionId);

                messages.$add({
                    sender: AuthenticationService.getUser().username,
                    text: text,
                    time: Firebase.ServerValue.TIMESTAMP
                });

            }
        }
    }
]);

