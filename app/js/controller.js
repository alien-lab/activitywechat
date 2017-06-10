/**
 * Created by 橘 on 2017/5/7.
 */

(function(){
    'use strict';
    var app=angular.module("xjszrs");
    app.controller("registController",["$scope","$state","$location","smsService","toaster","regService",
        "wechatObject","$rootScope","$timeout",
        function($scope,$state,$location,smsService,toaster,regService,wechatObject,$rootScope,$timeout){
        $scope.form={
            openid:wechatObject.openid,
            icon:wechatObject.icon,
            nickname:wechatObject.nickname,
            parentName:"",
            phone:"",
            phonecode:"",
            smsid:"",
            email:"",
            relation:"mother",
            childName:"",
            childSex:"boy",
            age:6,
            school:"",
            joinkids:1,
            joinadults:1,
            actFlag:"xjszrs"
        }

        $scope.codebtn=true;
        $scope.ispreview=false;

        $scope.isnew=true;
        $scope.joinStatus="";
        $scope.$watch("$root.openid",function(newvalue,oldvalue){
            console.log("openid changed:",newvalue);
            if(newvalue&&newvalue!=""){
                $rootScope.isloading=true;
                console.log("get reg start...");
                regService.getReg(newvalue,function(result){
                    console.log("get reg finish...",result);
                    $rootScope.isloading=false;
                    console.log("getreg",result);
                    if(result.data.length>0){
                        var join=result.data[0];
                        $scope.isnew=false;
                        $scope.joinStatus=join.joinStatus;
                        if($scope.joinStatus!=''&&$scope.joinStatus!='报名费用未交'){
                            $scope.ispreview=true;
                        }
                        $scope.form=angular.fromJson(join.joinForm);
                        console.log($scope.form);
                    }
                });
            }
        },true);


        $scope.sendSMS=function(){
            if($scope.form.phone==""){
                toaster.pop("error","错误提示","请输入手机号获取验证码");
                return;
            }
            $scope.codebtn=false;
            $timeout(function(){
                $scope.codebtn=true;
            },1000*60);
            smsService.sendSMS($scope.form.phone,function(result,iserror){
                if(!iserror){
                    toaster.pop("error","错误提示",result.data.errormsg);
                    return;
                }
                $scope.form.smsid=result.data.identifier;
            });
        }
        $scope.saveReg=function() {
            if (wechatObject.openid == null || wechatObject.openid == "") {
                toaster.pop("error", "错误提示", "获取微信身份发生错误。");
                return;
            }
            if ($scope.form.parentName == "" || $scope.form.parentName == null) {
                toaster.pop("warning", "操作提示", "请输入家长姓名");
                return;
            }
            if ($scope.form.phone == "" || $scope.form.phone == null) {
                toaster.pop("warning", "操作提示", "请输入手机号码");
                return;
            }
            // if ($scope.form.phonecode == "" || $scope.form.phonecode == null) {
            //     toaster.pop("warning", "操作提示", "请输入短信验证码");
            //     return;
            // }


            if ($scope.form.childName == "" || $scope.form.childName == null) {
                toaster.pop("warning", "操作提示", "请输入孩子姓名");
                return;
            }

            if ($scope.form.joinkids == 2) {
                if ($scope.form.childName2 == "" || $scope.form.childName2 == null) {
                    toaster.pop("warning", "操作提示", "请输入第二位孩子姓名");
                    return;
                }
            }
            // if ($scope.form.aggree == "" || $scope.form.aggree == null) {
            //     toaster.pop("warning", "操作提示", "请阅读并同意报名协议");
            //     return;
            // }
            $scope.ispreview = true;
        }
        $scope.saveReg2=function(){
            $scope.form.openid=wechatObject.openid;
            $scope.form.nickname=wechatObject.nickname;
            $scope.form.icon=wechatObject.icon;
            console.log($scope.form);
            regService.reg($scope.form,function(result,iserr){
                console.log(result,iserr);
                if(!iserr){
                    toaster.pop("warning","操作提示",result.errormsg);
                    return;
                }
                var orderinfo=result.orderInfo;
                var joinList=result.joinList;
                wx.chooseWXPay({
                    timestamp: orderinfo.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: orderinfo.nonceStr, // 支付签名随机串，不长于 32 位
                    package: orderinfo.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                    signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: orderinfo.paySign, // 支付签名
                    success: function (res) {
                        // 支付成功后的回调函数
                        if(res.errMsg== "chooseWXPay:ok" ) {
                            console.log("支付成功",res);
                            regService.payFinish(joinList.joinOpenid,joinList.orderNo,function(payresult,error){
                                if(!iserr){
                                    toaster.pop("warning","操作提示",payresult.data.errormsg);
                                    return;
                                }
                                toaster.pop("info","报名成功","感谢您的报名。您的报名信息已提交，我们将很快审核您的信息，请关注服务号后续通知。");
                                $scope.joinStatus=payresult.data.joinStatus;
                            });
                        }
                    }
                });
            });
        }
    }])
})();
