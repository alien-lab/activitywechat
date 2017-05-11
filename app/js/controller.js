/**
 * Created by 橘 on 2017/5/7.
 */

(function(){
    'use strict';
    var app=angular.module("xjszrs");
    app.controller("registController",["$scope","$state","$location","smsService","toaster","regService",
        function($scope,$state,$location,smsService,toaster,regService){
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
                $scope.form.smsback=result.data;
                console.log(result);
            });
        }
        $scope.saveReg=function(){
            if($scope.form.parentName==""||$scope.form.parentName==null){
                toaster.pop("warning","操作提示","请输入家长姓名");
                return;
            }
            if($scope.form.phone==""||$scope.form.phone==null){
                toaster.pop("warning","操作提示","请输入手机号码");
                return;
            }
            if($scope.form.phonecode==""||$scope.form.phonecode==null){
                toaster.pop("warning","操作提示","请输入短信验证码");
                return;
            }
            if($scope.form.childName==""||$scope.form.childName==null){
                toaster.pop("warning","操作提示","请输入孩子姓名");
                return;
            }
            if($scope.form.aggree==""||$scope.form.aggree==null){
                toaster.pop("warning","操作提示","请阅读并同意报名协议");
                return;
            }
            console.log($scope.form);
            regService.reg($scope.form,function(result,iserr){
                console.log(result,iserr);
                if(iserr){

                }else{

                }
            });
        }
    }])
})();
