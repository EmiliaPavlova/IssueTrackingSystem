(function () {
    'use strict';

    angular.module('issueTracker.home', [
            'issueTracker.users.authentication'
        ])
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
            'authentication',
            'Notification',
            function($scope, $route, $location, authentication, Notification) {
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
                        .then(function(loggedInUser) {
                            //console.log(loggedInUser);
                            Notification.success('Login successful!');
                            $location.path('/');
                        });
                };

                $scope.logout = function() {
                    authentication.logout();
                };

                //function affiliatedProjectsAndIssues() {
                //    issues.getIssues()
                //        .then(function (data) {
                //            $scope.userIssues = data.Issues;
                //            $scope.numItems = data.Issues.length * data.TotalPages;
                //            $scope.maxSize = data.Issues.length;
                //            $scope.pagination = {
                //                startPage: 1
                //            };
                //
                //            var projects = {};
                //            for(var issue in data.Issues){
                //                var projectId = data.Issues[issue].Project.Id;
                //                projects[projectId] = data.Issues[issue].Project;
                //            }
                //
                //            $scope.projects = projects;
                //        })
                //}

            }]);
}());