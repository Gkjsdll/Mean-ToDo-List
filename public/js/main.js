"use strict";

var app = angular.module("toDoList", []);

app.controller("toDoCtrl", function($http){
  console.log("toDoCtrl");
  $http.get("/tasks")
    .then(function(data){
      console.log("success:", data);
    }, function(err){
      console.error("err:", err);
    });
});
