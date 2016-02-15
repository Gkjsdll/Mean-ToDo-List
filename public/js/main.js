"use strict";

var app = angular.module("toDoList", []);

/***
* The following factory is gutted directy from ngSweetAlert (http://oitozero.github.io/ngSweetAlert/#/home)
* It has been modified in order to make it run (I need more time fiddlign with it in order to implement it properly)
***/
app.factory('SweetAlert', [ '$rootScope', function ( $rootScope ) {

  var swal = window.swal;

  //public methods
  var self = {

    swal: function ( arg1, arg2, arg3 ) {
      $rootScope.$evalAsync(function(){
        if( typeof(arg2) === 'function' ) {
          swal( arg1, function(isConfirm){
            $rootScope.$evalAsync( function(){
              arg2(isConfirm);
            });
          }, arg3 );
        } else {
          swal( arg1, arg2, arg3 );
        }
      });
    },
    success: function(title, message) {
      $rootScope.$evalAsync(function(){
        swal( title, message, 'success' );
      });
    },
    error: function(title, message) {
      $rootScope.$evalAsync(function(){
        swal( title, message, 'error' );
      });
    },
    warning: function(title, message) {
      $rootScope.$evalAsync(function(){
        swal( title, message, 'warning' );
      });
    },
    info: function(title, message) {
      $rootScope.$evalAsync(function(){
        swal( title, message, 'info' );
      });
    }
  };

  return self;
}]);


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
    SweetAlert.swal({
      title: "Are you sure you want to delete this task?",
      text: "It cannot be recovered afterword.",
      showCancelButton: true,
      confirmButtonTedxt: "Yes, delete it!",
      closeOnConfirm: false,
      closeOnCancel: true
    }, function(isConfirm) {
        if(isConfirm) {
          $http.delete(`/tasks/${thisTask.task._id}`)
          .then(function(res) {
            $scope.tasks.splice(thisTask.$index, 1);
          },function(err) {
            return console.error(err);
          });
          SweetAlert.swal("Task was deleted", "", "error");
        }
        else {
          SweetAlert.swal("Task was not deleted", "", "success");
        }
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
