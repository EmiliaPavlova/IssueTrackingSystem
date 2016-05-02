(function () {
  'use strict';

  angular.module('issueTracker.projects', ['issueTracker.projects.projectsService'])
      .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/projects', {
              templateUrl: 'app/news-feed/news-feed.html',
              controller: 'NewsFeedCtrl'
          })
      }])


      .controller('ProjectsController', [
          '$scope',
          '$routeParams',
          '$location',
          'authenticationService',
          'userService',
          'projectService',
          'notifyService',
          'pageSize',
          function($scope,$routeParams, $location, authenticationService,userService, projectService,notifyService,pageSize) {

              $scope.getAllProjects = function () {
                  projectsService.getAllProjects(
                      function success(data) {
                          $scope.allProjects = data;
                      },
                      function error(error) {
                          Notification.error('Failed loading projects', error);
                      });
              }
      }]);
}());