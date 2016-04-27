(function () {
    'use strict';

    angular.module('issueTracker.common', [])
        .controller('MainController', [
            '$scope',
            'authentication',
            function($scope, authentication) {
                $scope.isAuthenticated = function() {
                    return authentication.isAuthenticated();
                }
            }]);
}());