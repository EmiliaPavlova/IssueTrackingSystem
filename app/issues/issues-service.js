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
                    pageSize = parseInt(pageSize || 10);
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

                function getProjectIssues(projectId) {
                    var deferred = $q.defer();
                    var url = BASE_URL + '/projects/' + projectId + '/issues';

                    $http.get(url, authentication.authorizationHeader())
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(response){
                            deferred.reject(response);
                        });

                    return deferred.promise;
                }

                function getIssueById(issueId){
                    var deferred = $q.defer();

                    var url = BASE_URL + '/Issues/' + issueId;

                    $http.get(url, authentication.authorizationHeader())
                        .then(function(response){
                            deferred.resolve(response.data);
                        }, function(error){
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function addIssue(issue) {
                    var deferred = $q.defer();

                    var url = BASE_URL + '/issues';

                    $http.post(url, issue, authentication.authorizationHeader())
                        .then(function(response){
                            deferred.resolve(response.data);
                        }, function(error){
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function editIssue(issueId, issue) {
                    var deferred = $q.defer();

                    var url = BASE_URL + '/issues/' + issueId;

                    $http.put(url, issue, authentication.authorizationHeader())
                        .then(function(response){
                            deferred.resolve(response.data);
                        }, function(error){
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function updateIssueStatus(issueId, statusId) {
                    var deferred = $q.defer();

                    var url = BASE_URL + '/issues/' + issueId + '/changestatus?statusId=' + statusId;

                    $http.put(url, null, authentication.authorizationHeader())
                        .then(function(response){
                            deferred.resolve(response.data);
                        }, function(error){
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                return {
                    getUserIssues: getUserIssues,
                    getProjectIssues: getProjectIssues,
                    getIssueById: getIssueById,
                    addIssue: addIssue,
                    editIssue: editIssue,
                    updateIssueStatus: updateIssueStatus
                }
            }
        ])
}());