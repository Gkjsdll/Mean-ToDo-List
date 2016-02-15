"use strict";

var app = angular.module("toDoList", []);

app.controller("toDoCtrl", function($http, $scope){
  console.log("toDoCtrl");

  $http.get("/tasks")
    .then(function(res){
      console.log("Tasks:", res.data);
      $scope.tasks = res.data;
      console.log("$scope.tasks", $scope.tasks);
    }, function(err){
      console.error(err);
    });

    $scope.addTask = function() {
      $http.post("/tasks", $scope.task)
        .then(function(res){
          $scope.tasks.push(res.data);
          console.log(res);
        }, function(err){
          console.error(err);
        })
    }

    $scope.deleteTask = function() {
      console.log("deleteTask");
      $http.delete(`/tasks/${this.task._id}`)
        .then(function(res) {
          console.log(res);
        },function(err) {
          return console.error(err);
        });
      console.log(this.task._id);
    }
});
