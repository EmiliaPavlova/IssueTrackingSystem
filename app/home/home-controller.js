(function () {
  'use strict';

  angular.module('issueTracker.home', [
        'issueTracker.users.authentication'
      ])
      .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/', {
          templateUrl: 'app/home/home.html',
          controller: 'HomeController'
        });
      }])
      .controller('HomeController', [
        '$scope',
        '$route',
        '$location',
        'authentication',
        function($scope, $route, $location, authentication) {
          $scope.isLogged = authentication.isAuthenticated();
          $scope.register = function(registeredUser) {
            authentication.registerUser(registeredUser)
                .then(function(response) {
                  $scope.login({
                      username: registeredUser.email,
                      password: registeredUser.password });
                });
          };

          $scope.login = function(user) {
            authentication.loginUser(user)
                .then(function(loggedInUser) {
                  console.log(loggedInUser);
                    $scope.isLogged = true;
                  $location.path('/');
                });
          };

          $scope.logout = function() {
            authentication.logout();
              $scope.isLogged = false;
            $location.path('/');
          };

        }]);
}());