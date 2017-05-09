/**
 * Created by 橘 on 2017/5/7.
 */

(function(){
    'use strict';
    var app=angular.module("xjszrs");
    app.controller("registController",["$scope","$state","$location","smsService","toaster",
        function($scope,$state,$location,smsService,toaster){
        var code=$location.search().code;
        $scope.form={
            parentName:"",
            phone:"",
            phonecode:"",
            email:"",
            relation:"mother",
            childName:"",
            childSex:"boy",
            age:6,
            school:""
        }
        $scope.sendSMS=function(){
            if($scope.form.phone==""){
                toaster.pop("error","错误提示","请输入手机号获取验证码");
                return;
            }
            smsService.sendSMS($scope.form.phone,function(result,iserror){
                if(!iserror){
                    toaster.pop("error","错误提示",result);
                    return;
                }
                console.log(result);
            })
        }
    }])
})();
