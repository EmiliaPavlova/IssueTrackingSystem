(function () {
  'use strict';

  angular.module('issueTracker.projects.projectsController', ['issueTracker.projects.projectsService'])
      .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/projects', {
              templateUrl: 'app/projects/projects.html',
              controller: 'ProjectsController',
              resolve: {
                  access: ['$location', 'authentication', 'Notification',
                      function($location, authentication, Notification){
                          if(!authentication.isAuthenticated()){
                              Notification.error('Unauthorized access');
                              $location.path('/');
                          }
                      }]
              }
          })
              .when('/projects/:id', {
                  templateUrl: 'app/projects/project.html',
                  controller: 'ProjectsController',
                  resolve: {
                      access: ['$location', 'authentication', 'Notification',
                          function($location, authentication, Notification){
                              if(!authentication.isAuthenticated()){
                                  Notification.error('Unauthorized access');
                                  $location.path('/');
                              }
                          }]
                  }
              })
      }])


      .controller('ProjectsController', [
          '$scope',
          '$location',
          '$routeParams',
          'projectsService',
          'authentication',
          function($scope, $location, $routeParams, projectsService, authentication) {

              projectsService.getAllProjects()
                  .then(function(data) {
                      $scope.allProjects = data.Projects;
                      $scope.totalItems = data.TotalCount;
                      $scope.maxSize = data.Projects.length;
                      $scope.currentPage = 1;
                  });

              $scope.reloadProjects = function() {
                  projectsService.getAllProjects(null, $scope.currentPage)
                      .then(function (data) {
                          $scope.allProjects = data.Projects;
                      });
              };

              $scope.viewProject = function(projectId) {
                  $location.path('/projects/' + projectId)
              }
      }]);
}());