(function () {
    'use strict';

    angular.module('issueTracker.users.usersService', [])
        .factory('usersService', [
            '$http',
            '$q',
            'BASE_URL',
            'authentication',
            function($http, $q, BASE_URL, authentication) {
                function getAllUsers() {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + '/Users', authentication.authorizationHeader())
                        .then(function(response){
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function getUsersByQuery(query) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + '/Users/?filter=' + query, authentication.authorizationHeader())
                        .then(function(response){
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                return {
                    getAllUsers: getAllUsers,
                    getUsersByQuery: getUsersByQuery
                }
            }
        ])
}());