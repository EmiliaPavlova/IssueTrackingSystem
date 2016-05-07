(function () {
    'use strict';

    angular.module('issueTracker.users.usersController', [
            'issueTracker.users.authentication'
        ])
        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.when('/Users/me', {
                templateUrl: 'app/users/profile.html',
                controller: 'UsersController'
            })
            .when('/Users', {
                templateUrl: 'app/users/users.html',
                controller: 'UsersController'
            });
        }])
        .controller('UsersController', [
            '$scope',
            '$http',
            'identity',
            'usersService',
            function($scope, $http, identity, usersService) {
                $scope.currentUser = identity.getCurrentUser();

                usersService.getAllUsers()
                    .then(function(data) {
                        $scope.allUsers = data;
                    });
           }])
}());