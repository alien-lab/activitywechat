(function(){
    'use strict';

    var app=angular.module("xjszrs");
    app.service("wechatService",["$http","domain","wechatappid","wechatObject",
        function($http,domain,wechatappid,wechatObject){
        this.wechatConfig=function(){
            $http({
                url:domain+"api/jsapi",
                data:{
                    url:window.location.href
                },
                method:"POST"
            }).then(function(response){
                wx.config({
                    debug: true,
                    appId: response.data.appid,
                    timestamp: response.data.timestamp,
                    nonceStr: response.data.nonceStr,
                    signature: response.data.signature,
                    jsApiList: [
                        'checkJsApi',
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems',
                        'hideAllNonBaseMenuItem',
                        'showAllNonBaseMenuItem',
                        'translateVoice',
                        'startRecord',
                        'stopRecord',
                        'onRecordEnd',
                        'playVoice',
                        'pauseVoice',
                        'stopVoice',
                        'uploadVoice',
                        'downloadVoice',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage',
                        'getNetworkType',
                        'openLocation',
                        'getLocation',
                        'hideOptionMenu',
                        'showOptionMenu',
                        'closeWindow',
                        'scanQRCode',
                        'chooseWXPay',
                        'openProductSpecificView',
                        'addCard',
                        'chooseCard',
                        'openCard'
                    ]
                });

                wx.ready(function (){
                    console.log("wechat jssdk on ready.")
                    wx.hideMenuItems({
                        menuList: ["menuItem:share:appMessage",
                            "menuItem:share:timeline",
                            "menuItem:share:qq",
                            "menuItem:share:weiboApp",
                            "menuItem:favorite",
                            "menuItem:share:facebook",
                            "menuItem:share:QZone"] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                    });
                });
            },function(){

            });
        }

        this.loadWechatUser=function(code){
            $http({
                url:domain+"api/getuserinfo?code="+code,
                method:"GET"
            }).then(function(response){
                wechatObject.openid=response.data.openid;
                wechatObject.nickname=response.data.nickname;
                wechatObject.icon=response.data.headimgurl;
            });
        }

        this.testUser=function(){
            wechatObject.openid="testopenid";
            wechatObject.nickname="临时用户";
            wechatObject.icon="image/logo.jpg";
        }
    }]);
    app.factory("wechatObject",[function(){
        return {
            "openid":"",
            "nickname":"",
            "icon":""
        }
    }]);
})();