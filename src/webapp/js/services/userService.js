angular.module('j.point.me').factory('UserService', ['$firebase',
    function ($firebase) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");

        return {

            /**
             * Returns all the users that are stored in firebase.
             */
            getUsers: function () {
                return $firebase(ref.child("users"));
            },

            /**
             * Adds a user with the specified username and user id to firebase.
             */
            addUser: function (username, userId) {
                var userExists = false;

                this.getUsers().$asArray()
                        .$loaded()
                        .then(function (data) {
                            angular.forEach(data, function (user, index) {
                                if (user.oAuthId === userId) {
                                    userExists = true;
                                }
                            })
                        }).then(function (data) {
                            if (!userExists) {
                                users.$push({name: username, oAuthId: userId}).then(function (newChildRef) {
                                    console.log('user with userId ' + userId + ' does not exist; adding');
                                });
                            } else {
                                console.log('user with userId ' + userId + ' already exists; not adding.');
                            }
                        });
            }
        }

    }]);