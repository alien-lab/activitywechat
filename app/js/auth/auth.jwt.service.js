(function() {
    'use strict';

    angular
        .module('xjszrs')
        .factory('AuthServerProvider', AuthServerProvider);

    AuthServerProvider.$inject = ['$http', '$localStorage', '$sessionStorage', '$q','tokenUrl'];

    function AuthServerProvider ($http, $localStorage, $sessionStorage, $q,tokenUrl) {
        var service = {
            getTokenRemote:getTokenRemote,
            getToken: getToken,
            login: login,
            loginWithToken: loginWithToken,
            storeAuthenticationToken: storeAuthenticationToken,
            logout: logout
        };

        return service;

        function getTokenRemote(){
            var deferred = $q.defer();
            $http({
                method:'post',
                url:tokenUrl,
                data:{password:"admin123!",rememberMe:false,username:"admin"}
            }).success(function(data,status,headers){
                deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getToken () {
            return $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        }

        function login (credentials) {

            // var data = {
            //     grant_type: "client_credentials",
            //     client_id: "wechat",
            //     client_secret: "wechat",
            // };
            return $http({
                method:'post',
                url:tokenUrl,
                data:{password:"admin123!",rememberMe:false,username:"admin"}
            }).success(authenticateSuccess);
            function authenticateSuccess (data, status, headers) {
                var bearerToken = data.token;
                if (angular.isDefined(bearerToken) && bearerToken != null) {
                    bearerToken = 'Bearer ' + bearerToken;
                    var jwt = bearerToken.slice(7, bearerToken.length);
                    service.storeAuthenticationToken(jwt, false);
                    return jwt;
                }
            }
        }

        function loginWithToken(jwt, rememberMe) {
            var deferred = $q.defer();

            if (angular.isDefined(jwt)) {
                this.storeAuthenticationToken(jwt, rememberMe);
                deferred.resolve(jwt);
            } else {
                deferred.reject();
            }

            return deferred.promise;
        }

        function storeAuthenticationToken(jwt, rememberMe) {
            if(rememberMe){
                $localStorage.authenticationToken = jwt;
            } else {
                $sessionStorage.authenticationToken = jwt;
            }
        }

        function logout () {
            delete $localStorage.authenticationToken;
            delete $sessionStorage.authenticationToken;
        }
    }
})();
