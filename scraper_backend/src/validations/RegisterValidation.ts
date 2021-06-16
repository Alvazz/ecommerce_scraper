import * as Joi from "joi";

export const RegisterValidation = {
  payload: Joi.object({
    first_name: Joi.string().required().label("First Name is required"),
    last_name: Joi.string().required().label("Last Name is required"),
    email: Joi.string().email().required().label("Email is required"),
    password: Joi.string().required().label("Password is required"),
  }),
};
