(function () {
    'use strict';

    angular.module('issueTracker.users.identity', [])
        .factory('identity', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {

                var deffered = $q.defer();

                var currentUser;

                return {
                    getCurrentUser: function() {
                        if (currentUser) {
                            return $q.when(currentUser);
                        }
                        else {
                            return deferred.promise;
                        }
                    },
                    removeUserProfile: function() {
                        currentUser = undefined;
                    },
                    requestUserProfile: function() {
                        var userProfileDeferred = $q.defer();

                        $http.get(BASE_URL + 'me')
                            .then(function(response) {
                                currentUser = response;
                                deferred.resolve(currentUser);
                                userProfileDeferred.resolve();
                            });

                        return userProfileDeferred.promise;
                    }
                }
            }]);
}());