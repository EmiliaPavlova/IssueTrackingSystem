(function () {
  'use strict';

  angular.module('issueTracker.projects.projectsController', ['issueTracker.projects.projectsService'])
      .config(['$routeProvider', function($routeProvider) {
          $routeProvider.when('/projects', {
              templateUrl: 'app/projects/projects.html',
              controller: 'ProjectsController'
          })
      }])


      .controller('ProjectsController', [
          '$scope',
          'projectsService',
          function($scope, projectsService) {

              projectsService.getAllProjects()
                  .then(function(data) {
                      $scope.allProjects = data.Projects;
                      $scope.totalItems = data.TotalCount;
                      $scope.maxSize = 10;
                      $scope.pagination = {
                          currentPage: 1
                      };
                  });

              $scope.reloadProjects = function() {
                  projectsService.getAllProjects(null, $scope.pagination.currentPage)
                      .then(function (data) {
                          $scope.allProjects = data.Projects;
                      });
              };
      }]);
}());