/**
 * Created by 橘 on 2017/5/7.
 */
(function(){
    'use strict';

// Declare app level module which depends on views, and components
    angular.module('xjszrs', [
        "ui.router",'toaster',"ngAnimate","ngCookies","ngStorage"
    ]).
    config(['$stateProvider', '$locationProvider', '$urlRouterProvider','$httpProvider','$urlMatcherFactoryProvider',
        function($stateProvider,$locationProvider,$urlRouterProvider,$httpProvider,$urlMatcherFactoryProvider) {//路由定义
            $httpProvider.interceptors.push('authInterceptor');  //http请求拦截器
            $httpProvider.interceptors.push('authExpiredInterceptor');

            $urlRouterProvider.otherwise('/regist');
            $stateProvider
                .state('regist', {
                    url: '/regist',
                    templateUrl: 'views/regist.html',
                    controller:"registController"
                })
                .state('regsuccess', {
                    url: '/regsuccess',
                    templateUrl: 'views/success.html'
                })
            ;
    }])
    ;
})();
(function () {
    'use strict';
    angular.module('xjszrs').run(['$rootScope', '$log', function($rootScope, $log){
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            $log.debug('successfully changed states') ;

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });

        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
            $log.error('The request state was not found: ' + unfoundState);
        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
            $log.error('An error occurred while changing states: ' + error);

            $log.debug('event', event);
            $log.debug('toState', toState);
            $log.debug('toParams', toParams);
            $log.debug('fromState', fromState);
            $log.debug('fromParams', fromParams);
        });
    }]);

})();
(function () {
    'use strict';
    // DO NOT EDIT THIS FILE, EDIT THE GULP TASK NGCONSTANT SETTINGS INSTEAD WHICH GENERATES THIS FILE
    angular
        .module('xjszrs')
        .constant('tokenUrl', "http://www.bigercat.com/activityserver/api/authenticate")
        .constant('homePage',"regist")
    ;
})();