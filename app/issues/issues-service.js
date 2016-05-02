(function () {
    'use strict';

    angular.module('issueTracker.issuesService', [])
        .factory('issues', [
            '$http',
            '$q',
            'BASE_URL',
            'BASE_PAGE_SIZE',
            'identity',
            function($http, $q, BASE_URL, BASE_PAGE_SIZE, identity) {
                function getIssues(pageSize, pageNumber, orderBy) {
                    pageSize = parseInt(pageSize || BASE_PAGE_SIZE);
                    pageNumber = parseInt(pageNumber || 1);
                    orderBy = orderBy || 'DueDate desc';

                    var issuesUrl = BASE_URL + 'Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy;
                    var deferred = $q.defer();

                    $http.get(issuesUrl, {
                            headers: {
                                Authorization: 'Bearer ' + sessionStorage['access_token']
                            }
                        })
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                return {
                    getIssues: getIssues
                }
            }
        ])
}());