angular.module('j.point.me').factory('UserService', ['$firebase',
    function ($firebase) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");


        function getUsers() {
            return $firebase(ref.child("users"));
        }

        function addUser(username, userId) {
            var userExists = false;

            getUsers().$asArray()
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

        return {
            getUsers: getUsers,
            addUser: addUser
        }

    }]);