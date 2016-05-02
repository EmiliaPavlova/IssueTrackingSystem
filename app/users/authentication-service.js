(function () {
    'use strict';

    angular.module('issueTracker.users.authentication', [])
        .factory('authentication', [
            '$http',
            '$q',
            '$window',
            '$location',
            'identity',
            'BASE_URL',
            function($http, $q, $window, $location, identity, BASE_URL) {

                function registerUser(registerUser) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + '/api/Account/Register', registerUser)
                        .then(function(response){
                            deferred.resolve(response.data);
                        });

                    return deferred.promise;
                }

                function authorizationHeader() {
                    return { headers: {Authorization: sessionStorage['access_token']}};
                }

                function loginUser(user) {
                    var deferred = $q.defer();

                    var loginUser = {
                        username: user.username,
                        password: user.password,
                        grant_type: "password"
                    };

                    $http.post(BASE_URL + '/api/Token', $.param(loginUser), {
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function(response) {
                        //console.log(response);
                        sessionStorage['access_token'] = 'Bearer ' + response.data.access_token;

                        identity.requestUserProfile()
                            .then(function(){});
                        deferred.resolve(response);
                    }, function(error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                }

                function isAuthenticated() {
                    return sessionStorage['access_token'] != null;
                }

                function changePassword(password) {
                    var deferred = $q.defer();

                    $http.post(BASE_URL + 'api/Account/ChangePassword', password, {
                            headers: {
                                Authorization: 'Bearer ' + sessionStorage['access_token']
                            }
                        })
                        .then(function (response) {
                            deferred.resolve(response);
                        });

                    return deferred.promise;
                }

                function logout() {
                    //delete sessionStorage['access_token'];
                    $window.sessionStorage.clear();
                    identity.removeUserProfile();
                }

                return {
                    registerUser: registerUser,
                    loginUser: loginUser,
                    isAuthenticated: isAuthenticated,
                    authorizationHeader: authorizationHeader,
                    changePassword: changePassword,
                    logout: logout
                }
            }]);
}());