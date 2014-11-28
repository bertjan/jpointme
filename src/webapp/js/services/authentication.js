angular.module('j.point.me').factory('AuthenticationService', ["$log", "$q", "$timeout", "$firebaseAuth",
    function ($log, $q, $timeout, $firebaseAuth) {

        var ref = new Firebase("https://jpointme.firebaseio.com/");
        var auth = $firebaseAuth(ref);


        function authenticate(provider) {
            var auth = $firebaseAuth(ref);

            var deferred = $q.defer();

            auth.$authWithOAuthPopup(provider)
                    .then(function (authData) {
                        $log.info("Logged in as:", authData);
                        deferred.resolve(getUser(authData));
                    })
                    .catch(function (error) {
                        $log.error("Authentication failed: ", error);
                        deferred.reject(error);
                    });

            return deferred.promise;
        }

        function addUser(user) {

        }

        function logout() {
            var auth = $firebaseAuth(ref);

            var deferred = $q.defer();
            deferred.promise.then(function () {
                $log.info("Logged off.");
                deferred.resolve();
            })
                    .catch(function (error) {
                        $log.error("Logoff failed: ", error);
                        deferred.reject(error);
                    });

            $timeout(function () {
                auth.$unauth();
                deferred.resolve();
            }, 10);

            return deferred.promise;
        }

        function isAuthenticated() {
            if (auth.$getAuth()) {
                return true;
            } else {
                return false;
            }
        }

        function getUser(authData) {
            var authData = authData || auth.$getAuth();
            return {
                userId: authData.auth.provider + '/' + authData.auth.uid,
                username: authData.github.displayName
            }
        }


        return {
            authenticate: authenticate,
            logout: logout,
            isAuthenticated: isAuthenticated,
            getUser: getUser
        }

    }]);