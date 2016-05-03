(function () {
    'use strict';

    angular.module('issueTracker.issues.issuesService', [])
        .factory('issuesService', [
            '$http',
            '$q',
            'BASE_URL',
            'PAGE_SIZE',
            'authentication',
            function($http, $q, BASE_URL, PAGE_SIZE, authentication) {
                function getUserIssues(pageSize, pageNumber, orderBy) {
                    pageSize = parseInt(pageSize || PAGE_SIZE);
                    pageNumber = parseInt(pageNumber || 1);
                    orderBy = orderBy || 'DueDate desc';

                    var issuesUrl = BASE_URL + '/Issues/me?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&orderBy=' + orderBy;
                    // /issues/me?orderBy=Project.Name desc, IssueKey&pageSize=2&pageNumber=1
                    var deferred = $q.defer();

                    $http.get(issuesUrl, authentication.authorizationHeader())
                        .then(function(response) {
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                return {
                    getUserIssues: getUserIssues
                }
            }
        ])
}());