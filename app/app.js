(function () {
  'use strict';

  angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.home',
        'issueTracker.users',
        'issueTracker.users.identity'
      ])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
      }])
      .constant('BASE_URL', 'https://softuni-issue-tracker.azurewebsites.net');

}());
