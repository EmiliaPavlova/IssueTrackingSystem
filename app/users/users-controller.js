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
            'authentication',
            function($scope, $http, authentication) {

                authentication.getCurrentUser()
                    .then(function(user) {
                        $scope.currentUser = [
                            currentUser.id = currentUser.id,
                            currentUser.username = currentUser.username,
                            currentUser.isAdmin = currentUser.isAdmin
                        ];
                    });

                $scope.isAuthenticated = authentication.isAuthenticated();

            }]);
}());