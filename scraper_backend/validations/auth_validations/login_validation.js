const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports = {
  body: validator.body(loginSchema),
};
