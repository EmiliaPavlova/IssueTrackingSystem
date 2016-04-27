(function () {
  'use strict';

  angular.module('issueTracker', [
        'ngRoute',
        'issueTracker.common',
        'issueTracker.home',
        'issueTracker.users',
        'issueTracker.users.identity',
        'issueTracker.users.logout'
      ])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.otherwise({redirectTo: '/'});
      }])
      .constant('BASE_URL', 'https://softuni-issue-tracker.azurewebsites.net');

}());
