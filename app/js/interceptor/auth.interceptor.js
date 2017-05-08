/**
 * http请求拦截器，用来将每个http请求加上token
 */
(function() {
    'use strict';

    angular
        .module('xjszrs')
        .factory('authInterceptor', authInterceptor);

    authInterceptor.$inject = ['$localStorage','$sessionStorage',"$q"];

    function authInterceptor ($localStorage, $sessionStorage,$q,AuthServerProvider) {
        var service = {
            request: request
        };

        return service;

        function request (config) {
            config.headers = config.headers || {};

            var token=$sessionStorage.authenticationToken;
            if(!token){

            }
            config.headers.Authorization = 'Bearer ' + token;
            return config;

        }
    }
})();
