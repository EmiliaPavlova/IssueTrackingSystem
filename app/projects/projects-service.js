(function () {
    'use strict';

    angular.module('issueTracker.projects.projectsService', [])
        .factory('projectsService', [
            '$http',
            'BASE_URL',
            'identity',
            function getAllProject($http, BASE_URL, identity) {

                //var projectsService = {};

                //$http.get(BASE_URL + 'projects/', {
                //    headers: {
                //        Authorization: 'Bearer ' + identity.getAccessToken()
                //    }
                //});
            }


        ])
}());