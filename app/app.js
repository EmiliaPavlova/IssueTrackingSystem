(function () {
    'use strict';

    angular.module('issueTracker', [
            'ngRoute',
            'ui-notification',
            'ui.bootstrap.pagination',
            'issueTracker.common',
            'issueTracker.homeController',
            'issueTracker.issues.issuesService',
            'issueTracker.projects.projectsService',
            'issueTracker.projects.projectsController',
            'issueTracker.users',
            'issueTracker.users.identity',
            'issueTracker.users.logout',
            'issueTracker.users.changePassword'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.otherwise({redirectTo: '/'});
        }])
        .constant('BASE_URL', 'https://softuni-issue-tracker.azurewebsites.net')
        .constant('PAGE_SIZE', 5);
}());
