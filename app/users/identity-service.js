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
                        //return JSON.parse(sessionStorage['user']);
                        return sessionStorage['user'];
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
                                sessionStorage['user'] = JSON.stringify(response.data);
                                userProfileDeferred.resolve();
                            });

                        return userProfileDeferred.promise;
                    }
                }
            }]);
}());