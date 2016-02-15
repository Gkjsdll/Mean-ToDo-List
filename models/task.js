"use strict";

var mongoose = require("mongoose");

var Task;

var taskSchema = mongoose.Schema({
  name: { type: String, required:true },
  desc: { type: String, required:true },
  due: { type: Date, required:true },
  complete: { type: Boolean, default: false }
});

Task = mongoose.model("Task", taskSchema);

module.exports = Task;
