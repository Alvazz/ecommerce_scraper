const Joi = require('joi')
const validator = require('express-joi-validation').createValidator({})

const registerSchema = Joi.object({
  first_name: Joi.string().required().label("First name"),
  last_name: Joi.string().required().label("Last Name"),
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().required().label("Password"),
});

module.exports = {
  body: validator.body(registerSchema),
};
