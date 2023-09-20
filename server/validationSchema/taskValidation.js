const Joi = require("joi");

const schema = Joi.object({
  task: Joi.string().min(3).max(30).required(),
});
exports.schema = schema;
