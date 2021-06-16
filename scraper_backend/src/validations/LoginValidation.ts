import * as Joi from "joi";

export const LoginValidation = {
  payload: Joi.object({
    email: Joi.string().email().required().label("Email is required"),
    password: Joi.string().required().label("Password is required"),
  }),
};
