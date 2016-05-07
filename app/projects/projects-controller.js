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
              .when('/projects/add', {
                  templateUrl: 'app/projects/add-project.html',
                  controller: 'ProjectsController',
                  resolve: {
                      access: ['$location', 'authentication', 'Notification',
                          function($location, authentication, Notification){
                              if(!identity.getCurrentUser().isAdmin){
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

              projectsService.getProjectById($routeParams.id)
                  .then(function (data) {
                      $scope.project = data;
                  });

              projectsService.getProjectIssues($routeParams.id)
                  .then(function (data) {
                      $scope.projectIssues = data;
                  });

              $scope.addProject = function(data) {
                  var Priorities = [],
                      Labels = [];

                  data.priorities.split(",").forEach(function(p) {
                      Priorities.push({
                          Name: p.trim()
                      });
                  });

                  data.labels.split(",").forEach(function(p) {
                      Labels.push({
                          Name: p.trim()
                      });
                  });

                  var project = {
                      Name: data.Name,
                      Description: data.Description,
                      ProjectKey: data.Name.match(/b(\w)/g).join(''),
                      labels: Labels,
                      priorities: Priorities,
                      LeadId: data.LeadId
                  };

                  projectsService.addProject(project)
                      .then(function(data) {
                          Notification.success('Project added');
                          $location.path('/projects/' + data.Id);
                      });
              }
      }]);
}());