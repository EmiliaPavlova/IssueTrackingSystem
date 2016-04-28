(function () {
    'use strict';

    angular.module('issueTracker.users.changePassword', [])
        .config(['$routeProvider', function ($routeProvider) {
                $routeProvider.when('/Account/ChangePassword', {
                    controller: 'passwordController',
                    templateUrl: 'app/users/change-password.html'
                })
            }])
        .controller('passwordController', [
            '$scope',
            'authentication',
            function($scope, authentication){
                $scope.changePassword = function(changedPassword){
                    console.log('Changed password to ' + changedPassword);
                    authentication.changePassword(changedPassword);
                }
            }
        ])
}());