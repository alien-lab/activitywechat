/**
 * Created by 橘 on 2017/5/7.
 */
(function(){
    'use strict';
    var app=angular.module("xjszrs");
    app.service("smsService",["$http","smsurl",function($http,smsurl){
        this.sendSMS=function(phone,callback){
            $http({
                url:smsurl,
                method:"POST",
                data:{phone:phone}
            }).then(function(result){
                callback(result,true);
            },function(result){
                callback(result,false);
            });
        }
    }]);

    app.service("regService",["$http","domain",function($http,domain){
        this.reg=function(form,callback){
            $http({
                url:domain+"api/join-lists/json",
                method:"POST",
                data:{joinJson:angular.toJson(form)}
            }).then(function(result){
                callback(result,true);
            },function(result){
                callback(result,false);
            });
        }
    }]);
})();