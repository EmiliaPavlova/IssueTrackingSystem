(function () {
    'use strict';

    angular.module('issueTracker', [
            'ngRoute',
            'ui-notification',
            'ui.bootstrap.pagination',
            'issueTracker.common',
            'issueTracker.homeController',
            'issueTracker.issues.issuesService',
            'issueTracker.issues.issuesController',
            'issueTracker.projects.projectsService',
            'issueTracker.projects.projectsController',
            'issueTracker.labels.labelsService',
            'issueTracker.users.usersController',
            'issueTracker.users.identity',
            'issueTracker.users.logout',
            'issueTracker.users.changePassword',
            'issueTracker.users.usersService'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
        }])
        .constant('BASE_URL', 'https://softuni-issue-tracker.azurewebsites.net')
        .constant('PAGE_SIZE', 5);
}());
