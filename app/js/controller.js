/**
 * Created by 橘 on 2017/5/7.
 */

(function(){
    'use strict';
    var app=angular.module("xjszrs");
    app.controller("registController",["$scope","$state","$location","smsService","toaster","regService","wechatObject",
        function($scope,$state,$location,smsService,toaster,regService,wechatObject){
        var code=$location.search().code;
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
            actFlag:"xjszrs"
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
                $scope.form.smsid=result.data.identifier;
            });
        }
        $scope.saveReg=function(){
            if(wechatObject.openid==null||wechatObject.openid==""){
                toaster.pop("error","错误提示","获取微信身份发生错误。");
                return;
            }
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
            $scope.form.openid=wechatObject.openid;
            $scope.form.nickname=wechatObject.nickname;
            $scope.form.icon=wechatObject.icon;
            console.log($scope.form);
            regService.reg($scope.form,function(result,iserr){
                console.log(result,iserr);
                if(!iserr){
                    toaster.pop("warning","操作提示",result.data.errorMsg);
                    return;
                }
                var orderinfo=result.orderInfo;
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
                        }
                    }
                });
            });
        }
    }])
})();
