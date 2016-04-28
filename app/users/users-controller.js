(function () {
    'use strict';

    angular.module('issueTracker.users', [
            'issueTracker.users.authentication'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/Users/me', {
                templateUrl: 'app/users/profile.html',
                controller: 'UsersController'
            });
        }])
        .controller('UsersController', [
            '$scope',
            '$http',
            'identity',
            function($scope, $http, identity) {

                $scope.currentUser = identity.getCurrentUser();
           }])
}());