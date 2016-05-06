(function () {
    'use strict';

    angular.module('issueTracker.homeController', [])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController'
            });
        }])
        .controller('HomeController', [
            '$scope',
            '$route',
            '$location',
            'issuesService',
            'projectsService',
            'authentication',
            'identity',
            'Notification',
            function($scope, $route, $location, issuesService, projectsService, authentication, identity, Notification) {
                $scope.register = function(registeredUser) {
                    authentication.registerUser(registeredUser)
                        .then(function(response) {
                            $scope.login({
                                username: registeredUser.email,
                                password: registeredUser.password });
                        });
                    Notification.success('Registration successful!');
                };

                $scope.login = function(user) {
                    authentication.loginUser(user)
                        .then(function() {
                            affiliatedProjectsAndIssues();
                        })
                        .then(function(loggedInUser) {
                            Notification.success('Login successful!');
                        });
                };

                $scope.logout = function() {
                    authentication.logout();
                };

                if($scope.isAuthenticated()){
                    affiliatedProjectsAndIssues();
                }

                function affiliatedProjectsAndIssues() {
                    issuesService.getUserIssues()
                        .then(function(data) {
                            $scope.userIssues = data.Issues;
                            $scope.totalItems = data.Issues.length * data.TotalPages;
                            $scope.maxSize = data.Issues.length;
                            $scope.currentPage = 1;
                        });

                    projectsService.getAllUserProjects(JSON.parse(identity.getCurrentUser()).Id)
                    //console.log(JSON.parse(identity.getCurrentUser()).Id)
                        .then(function(data) {
                            $scope.projects = data.Projects;
                        });
                }

                $scope.reloadIssues = function() {
                    issuesService.getUserIssues(null, $scope.currentPage)
                        .then(function(data) {
                            $scope.userIssues = data.Issues;
                        });
                };

            }]);
}());