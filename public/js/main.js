"use strict";

var app = angular.module("toDoList", []);

app.controller("toDoCtrl", function($http, $scope){
  console.log("toDoCtrl");

  $http.get("/tasks")
    .then(function(res){
      console.log("Tasks:", res.data);
      $scope.tasks = res.data;
    }, function(err){
      console.error(err);
    });

    $scope.addTask = function(){
      // console.log($scope.task);
      $http.post("/tasks", $scope.task)
        .then(function(data){
          console.log(data);
        }, function(err){
          console.error(err);
        })
    }
});
