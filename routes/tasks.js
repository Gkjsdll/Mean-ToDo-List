"use strict";
var express = require('express');
var router = express.Router();

var Task = require("../models/task");

router.get("/", function(req, res, next) {
  Task.find({}, function(err, data){
    if(err) return res.status(400).send(err);
    res.send(data);
  });
});

router.post("/", function(req, res, next) {
  var task = new Task();
  task.name = req.body.name;
  task.desc = req.body.desc;
});

module.exports = router;