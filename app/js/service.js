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

    app.service("regService",["regResource",function(regResource){
        this.reg=function(form,callback){
            regResource.reg({
                joinJson:angular.toJson(form)
            },function(result){
                callback(result,true);
            },function(result){
                callback(result,false);
            });
        }
    }]);

    app.factory("regResource",["$resource","domain",function($resource,domain){
        return $resource("",{},{
            'reg':{method:'POST',url:domain+"api/join-lists/json"}
        });
    }])
})();