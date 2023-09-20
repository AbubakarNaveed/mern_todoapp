const { Schema, model } = require("mongoose");

const schema = new Schema({
  task: { type: String, required: true },
  done: { type: Boolean, default: false },
});

module.exports = model("tasks", schema);
