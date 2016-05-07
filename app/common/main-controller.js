(function () {
    'use strict';

    angular.module('issueTracker.common', [])
        .controller('MainController', [
            '$scope',
            'identity',
            'authentication',
            function($scope, identity, authentication) {
                $scope.isAuthenticated = function() {
                    return authentication.isAuthenticated();
                };

                $scope.isAdmin = function(){
                    if(authentication.isAuthenticated()){
                        var currentUser = identity.getCurrentUser();
                        if(currentUser){
                            return currentUser.isAdmin;
                        }
                    }

                    return false;
                }
            }]);
}());