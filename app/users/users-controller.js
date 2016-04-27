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

                identity.getCurrentUser()
                    .then(function(user) {
                        $scope.currentUser = {
                            id: user.id,
                            username: user.username,
                            isAdmin: user.isAdmin
                        };
                    });
           }]);
}());