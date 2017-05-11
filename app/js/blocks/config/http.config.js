(function() {
    'use strict';

    angular
        .module('xjszrs')
        .config(httpConfig);

    httpConfig.$inject = ['$urlRouterProvider', '$httpProvider', '$urlMatcherFactoryProvider'];

    function httpConfig($urlRouterProvider, $httpProvider, $urlMatcherFactoryProvider) {
        //Cache everything except rest api requests
        //httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/, /.*protected.*/], true);

        $urlRouterProvider.otherwise('/');
        $httpProvider.defaults.headers.put['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';
        $httpProvider.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded;charset=UTF-8';

        $httpProvider.defaults.transformRequest=[function ( data ) {
            var str = '';
            for( var i in data ) {
                str += i + '=' + data[i] + '&';
            }
            return str.substring(0,str.length-1);
        }];
        $httpProvider.interceptors.push('authExpiredInterceptor');
        $httpProvider.interceptors.push('authInterceptor');
        // jhipster-needle-angularjs-add-interceptor JHipster will add new application http interceptor here

        $urlMatcherFactoryProvider.type('boolean', {
            name : 'boolean',
            decode: function(val) { return val === true || val === 'true'; },
            encode: function(val) { return val ? 1 : 0; },
            equals: function(a, b) { return this.is(a) && a === b; },
            is: function(val) { return [true,false,0,1].indexOf(val) >= 0; },
            pattern: /bool|true|0|1/
        });
    }
})();
