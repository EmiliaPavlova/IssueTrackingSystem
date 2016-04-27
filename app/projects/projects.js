(function () {
  'use strict';

  angular.module('issueTracker.projects', ['ngRoute'])

      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
          templateUrl: 'app/projects/projects.html',
          controller: 'View2Ctrl'
        });
      }])

      .controller('View2Ctrl', [function() {

      }]);
}());