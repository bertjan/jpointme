angular.module('j.point.me').factory('AuthenticationService', ["$log", "$q", "$timeout", "$firebaseAuth",
    function($log, $q, $timeout, $firebaseAuth) {

        function authenticate(firebaseref, provider) {
            var auth = $firebaseAuth(firebaseref);

            var deferred = $q.defer();

            auth.$authWithOAuthPopup(provider)
                .then(function(authData) {
                    $log.info("Logged in as:", authData);
                    deferred.resolve(authData);
                })
                .catch(function(error) {
                    $log.error("Authentication failed: ", error);
                    deferred.reject(error);
                });

            return deferred.promise;
        }

        function addUser(user) {

        }

        function logout(firebaseref) {
            var auth = $firebaseAuth(firebaseref);

            var deferred = $q.defer();
            deferred.promise.then(function() {
                $log.info("Logged off.");
                deferred.resolve();
            })
            .catch(function(error) {
                $log.error("Logoff failed: ", error);
                deferred.reject(error);
            });

            $timeout(function() {
                auth.$unauth();
                deferred.resolve();
            }, 10);

            return deferred.promise;
        }

        return {
            authenticate: authenticate,
            logout: logout
        }

    }]);