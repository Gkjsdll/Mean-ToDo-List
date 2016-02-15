"use strict";

var app = angular.module("toDoList", [SweetAlert]);

app.controller("toDoCtrl", function($http, $scope, SweetAlert){

  $scope.sort = "+name";

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
      $scope.task = null;
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

  $scope.sortBy = function(clicked) {
    var sort = $scope.sort;
    console.log(clicked);
    console.log(sort.substr(1));
    if(sort.substr(1) === clicked){
      if(sort.charAt(0) === "+"){
        $scope.sort = `-${clicked}`;
      } else {
        $scope.sort = `+${clicked}`;
      }
    } else {
      $scope.sort = `+${clicked}`;
    }
  }

  $scope.toggleComplete = function(id) {
    $http.put(`/tasks/${id}`, {complete: this.task.complete})
      .then(function(res) {
        console.log(res);
      },
      function(err){
        console.error(err);
      });
  }
});
