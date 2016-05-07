(function () {
    'use strict';

    angular.module('issueTracker.issues.issuesController', [])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/issues/:id', {
                templateUrl: 'app/issues/issue.html',
                controller: 'IssueController',
                resolve: {
                    access: ['$location', 'authentication', 'Notification',
                        function ($location, authentication, Notification) {
                        if(!authentication.isAuthenticated()){
                            Notification.error('Unauthorized access');
                            $location.path('/');
                        }
                    }]
                }
            })
            .when('/projects/:id/add-issue', {
                templateUrl: 'app/issues/add-issue.html',
                controller: 'IssueController',
                resolve: {
                    access: ['$location', '$route', 'authentication', 'identity', 'projectsService', 'Notification',
                        function($location, $route, authentication, identity, projectsService, Notification){
                            if(!authentication.isAuthenticated()){
                                Notification.error('Unauthorized access');
                                $location.path('/');
                            }
                            var project = projectsService.getProjectById($route.current.params.id)
                                .then(function(project){
                                    var currentUser = identity.getCurrentUser();
                                    if(currentUser.Id !== project.Lead.Id && !currentUser.isAdmin){
                                        Notification.error('Admins and project leads only');
                                        $location.path('/');
                                    }
                                });
                        }]
                }
            })


            .when('/issues/:id/edit', {
                templateUrl: 'app/issues/edit-issue.html',
                controller: 'IssueController',
                resolve: {
                    access: ['$location', 'authentication', 'Notification',
                        function ($location, authentication, Notification) {
                            if(!authentication.isAuthenticated()){
                                Notification.error('Unauthorized access');
                                $location.path('/');
                            }
                        }]
                }
            })
        }])
        .controller('IssueController', [
            '$scope',
            '$routeParams',
            'issuesService',
            'projectsService',
            'identity',
            function($scope, $routeParams, issuesService, projectsService, identity) {
                $scope.isAssignee = false;
                $scope.isProjectLeader = false;
                issuesService.getIssueById($routeParams.id)
                    .then(function(data){
                        $scope.issue = data;
                        var currentUser = identity.getCurrentUser();
                        if(data.Assignee.Id === currentUser.Id){
                            $scope.isAssignee = true;
                        }

                        if(data.Author.Id === currentUser.Id){
                            $scope.isProjectLeader = true;
                        }
                    });

                issuesService.getProjectIssues($routeParams.id)
                    .then(function (data) {
                        $scope.projectIssues = data;
                    });

                $scope.labels = [];
                $scope.saveIssue = function() {
                    $scope.newIssue.ProjectId = $routeParams.id;
                };
                // not finished

                //projectsService.getProjectById($routeParams.id)
                //    .then(function(project){
                //        $scope.priorities = project.Priorities;
                //    });
            }
        ])
}());