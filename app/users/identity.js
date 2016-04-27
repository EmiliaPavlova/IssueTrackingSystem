(function () {
    'use strict';

    angular.module('issueTracker.users.identity', [])
        .factory('identity', [
            '$http',
            '$q',
            'BASE_URL',
            function($http, $q, BASE_URL) {

                var deferred = $q.defer();

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

                        $http.get(BASE_URL + '/users/me', {
                            headers: {
                                Authorization: sessionStorage['access_token']
                            }
                        })
                            .then(function(response) {
                                currentUser = response.data;
                                deferred.resolve(currentUser);
                                userProfileDeferred.resolve();
                            });

                        return userProfileDeferred.promise;
                    }
                }
            }]);
}());