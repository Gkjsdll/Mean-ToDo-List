"use strict";
var express = require('express');
var router = express.Router();

var Task = ("../models/task");

router.get('/', function(req, res, next) {
  Task.find({}, function(err, tasks) {

  });
  // Task.findOne({}, function(err, data){
  //   if(err) return res.status(400).send(err);
  //   res.send(data);
  res.send();
  // });
});

module.exports = router;
