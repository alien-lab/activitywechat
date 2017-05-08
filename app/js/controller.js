/**
 * Created by 橘 on 2017/5/7.
 */

(function(){
    'use strict';
    var app=angular.module("xjszrs");
    app.controller("registController",["$scope","$state","$location",function($scope,$state,$location){
        console.log($location.search().code);
        $scope.click=function(){
            $state.go("regsuccess");
        }
    }])
})()
