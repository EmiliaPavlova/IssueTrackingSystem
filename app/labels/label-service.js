(function () {
    'use strict';

    angular.module('issueTracker.labels.labelsService', [])
        .factory('labelsService', [
            '$http',
            '$q',
            'BASE_URL',
            'authentication',
            function($http, $q, BASE_URL, authentication) {
                function getLabelsByName(name) {
                    var deferred = $q.defer();

                    $http.get(BASE_URL + 'Labels/?filter=' + name, authentication.authorizationHeader())
                        .then(function (response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                return {
                    getLabelsByName: getLabelsByName
                }
            }
        ])
}());