import { Request, ResponseToolkit } from "@hapi/hapi";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import { Login, Register, UserModel } from "../interfaces";

const LoginController = async (req: Request, h: ResponseToolkit) => {
  try {

    const UserManager = getRepository(User);

    const login: Login = req.payload as Login;
    const userExists: UserModel = await UserManager.findOne({ where: { email: login.email }, select: ['id'] });

    return h.response(userExists).code(200);

  } catch (ex) {
    return h.response({ }).code(500);
  }
};

const RegisterController = async (req: Request, h: ResponseToolkit) => {
  try {

    const UserManager = getRepository(User);

    // Check if user exists
    const register: Register = req.payload as Register;
    const userExists: UserModel = await UserManager.findOne({ where: { email: register.email }, select: ['id', 'password'] });

  } catch (ex) {
    return h.response({ }).code(500);
  }
};

export {
  LoginController,
  RegisterController,
};
