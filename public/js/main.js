"use strict";

var app = angular.module("toDoList", []);

app.controller("toDoCtrl", function($http, $scope){
  console.log("toDoCtrl");

  $http.get("/tasks")
    .then(function(res){
      $scope.tasks = res.data;
    }, function(err){
      console.error(err);
    });

    $scope.addTask = function() {
      $http.post("/tasks", $scope.task)
        .then(function(res){
          $scope.tasks.push(res.data);
        }, function(err){
          console.error(err);
        })
    }

    $scope.deleteTask = function() {
      var thisTask = this;
      $http.delete(`/tasks/${this.task._id}`)
        .then(function(res) {
          $scope.tasks.splice(thisTask.$index, 1);
        },function(err) {
          return console.error(err);
        });
    }

    $scope.toggleComplete = function() {
      console.log(this);
    }
});
