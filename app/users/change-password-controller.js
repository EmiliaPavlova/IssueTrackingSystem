(function () {
    'use strict';

    angular.module('issueTracker.users.changePassword', [])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/Account/ChangePassword', {
                    controller: 'passwordController',
                    templateUrl: 'app/users/change-password.html',
                    resolve: {
                        access: ['$location', 'authentication', 'Notification',
                            function($location, authentication, Notification){
                            if(!authentication.isAuthenticated()){
                                Notification.error('Unauthorized action');
                                $location.path('/');
                            }
                        }]
                    }
                })
            }])
        .controller('passwordController', [
            '$scope',
            '$location',
            'authentication',
            'Notification',
            function($scope, $location, authentication, Notification){
                $scope.changePassword = function(changedPassword){
                    authentication.changePassword(changedPassword);
                    Notification.success('Password changed');
                    $location.path('/Users/me');
                }
            }
        ])
}());