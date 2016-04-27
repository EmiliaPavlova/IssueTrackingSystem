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

                function preserveUserData(data) {
                    var accessToken = data.access_token;
                    sessionStorage['access_token'] = 'Bearer ' + response.data.access_token;
                }

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
                        identity.requestUserProfile();
                        deferred.resolve(response);
                    }, function(error) {
                        deferred.reject(error);
                    });

                    return deferred.promise;
                }

                function isAuthenticated() {
                    return sessionStorage['access_token'] != null;
                }

                //function showProfile(currentUser) {
                //    var deferred = $q.defer();
                //
                //    var currentUser = undefined;
                //
                //    $http.get(BASE_URL + 'Users/me')
                //        .then(function(response) {
                //            currentUser = response;
                //            deferred.resolve(currentUser);
                //        })
                //
                //    return {
                //        getCurrentUser: function () {
                //            if (currentUser) {
                //                return $q.when(currentUser);
                //            }
                //            else {
                //                return deferred.promise;
                //            }
                //        },
                //        isAuthenticated: function () {
                //            return true;
                //        }
                //    };
                //}

                //function changePassword(changePasswordData) {
                //    $http.post(BASE_URL + 'api/Account/ChangePassword', changePasswordData, {headers: authorizationHeader()})
                //        .then(function (response) {
                //            notifyService.showInfo('Password Changed');
                //            $location.path('/Users/me');
                //        }, function (error) {
                //            notifyService.showError('Password Not Changed', error);
                //        })
                //}

                function logout() {
                    $window.sessionStorage.clear();
                    identity.removeUserProfile();
                }

                return {
                    registerUser: registerUser,
                    loginUser: loginUser,
                    isAuthenticated: isAuthenticated,
                    authorizationHeader: authorizationHeader,
                    //showProfile: showProfile,
                    //changePassword: changePassword,
                    logout: logout
                }
            }]);
}());