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

    app.service("regService",["regResource","$http","domain",function(regResource,$http,domain){
        this.reg=function(form,callback){
            regResource.reg({
                joinJson:angular.toJson(form)
            },function(result){
                callback(result,true);
            },function(result){
                callback(result,false);
            });
        }
        this.getReg=function(openid,callback){
            $http({
                url:domain+"api/join-lists/json/"+openid,
                method:"GET"
            }).then(function(result){
                if(callback){
                    callback(result,true);
                }
            },function(result){
                if(callback){
                    callback(result,false);
                }
            });
        }
        this.payFinish=function(openid,orderNo,callback){
            $http({
                url:domain+"api/join-lists/joinpay",
                method:"POST",
                data:{
                    openid:openid,
                    orderNo:orderNo
                }
            }).then(function(result){
                if(callback){
                    callback(result,true);
                }
            },function(result){
                if(callback){
                    callback(result,false);
                }
            });
        }
    }]);

    app.factory("regResource",["$resource","domain",function($resource,domain){
        return $resource("",{},{
            'reg':{method:'POST',url:domain+"api/join-lists/json"}
        });
    }])
})();