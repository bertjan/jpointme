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


                var users = this.getUsers();

                var user = users.$ref().orderByChild("oAuthId").equalTo(userId).once('value', function(snap) {
                    if (!snap.exists()){
                        users.$push({name: $scope.username, oAuthId: userId}).then(function (newChildRef) {
                            console.log('user with userId ' + userId + ' does not exist; adding');
                        });
                    }else{
                        console.log('user with userId ' + userId + ' already exists; not adding.');
                    }
                });
            }
        }

    }]);