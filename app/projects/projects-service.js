(function () {
    'use strict';

    angular.module('issueTracker.projects.projectsService', [])
        .factory('projectsService', [
            '$http',
            '$q',
            'BASE_URL',
            'PAGE_SIZE',
            'authentication',
            function($http, $q, BASE_URL, PAGE_SIZE, authentication) {
                function getAllUserProjects(userId, pageSize, pageNumber) {
                    pageSize = pageSize || 200;
                    pageNumber = pageNumber || 1;
                    var deferred = $q.defer();

                    var urlProjects = BASE_URL + '/projects?filter=Issues.Any(Assignee.Id=="' + userId + '")||LeadId=="' + userId + '"&pageSize=' + pageSize + '&pageNumber=' + pageNumber;

                    $http.get(urlProjects, authentication.authorizationHeader())
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getAllProjects(pageSize, pageNumber) {
                    pageSize = pageSize || 10;
                    pageNumber = pageNumber || 1;
                    var deferred = $q.defer();

                    var urlProjects = BASE_URL + '/projects?pageSize=' + pageSize + '&pageNumber=' + pageNumber + '&filter=';

                    $http.get(urlProjects, authentication.authorizationHeader())
                        .then(function (response) {
                            deferred.resolve(response.data);
                        }, function(error){
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                function getProjectById(projectId) {
                    var deferred = $q.defer();
                    var url = BASE_URL + '/projects/' + projectId;

                    $http.get(url, authentication.authorizationHeader())
                        .then(function (response) {
                            deferred.resolve(response.data);
                        }, function(error){
                            deferred.reject(error);
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

                function addProject(newProject) {
                    var deferred = $q.defer();
                    var url = BASE_URL + '/projects';

                    $http.post(url, newProject, authentication.authorizationHeader())
                        .then(function(response) {
                            deferred.resolve(response.data);
                        }, function(error) {
                            deferred.reject(error);
                        });

                    return deferred.promise;
                }

                return {
                    getAllUserProjects: getAllUserProjects,
                    getAllProjects: getAllProjects,
                    getProjectById: getProjectById,
                    getProjectIssues: getProjectIssues,
                    addProject: addProject
                }
            }
        ])
}());