import { Request, ResponseToolkit } from "@hapi/hapi";
import { getRepository } from "typeorm";

import { User } from "../entity/User";
import { ResponseHelper } from "../helpers/ResponseHelper";
import { Login, Register, UserModel } from "../interfaces";

const LoginController = async (req: Request, h: ResponseToolkit) => {
  try {

    const UserManager = getRepository(User);
    const login: Login = req.payload as Login;

    const userExists: UserModel = await UserManager.findOne({ where: { email: login.email }, select: ['id'] });
    if (!userExists) {
      return ResponseHelper(h, "USER404");
    }

    return ResponseHelper(h, "LOGIN200");

  } catch (ex) {
    return ResponseHelper(h, "SERVER500");
  }
};

const RegisterController = async (req: Request, h: ResponseToolkit) => {
  try {

    const UserManager = getRepository(User);
    const register: Register = req.payload as Register;

    // Check if user exists
    const userExists: UserModel = await UserManager.findOne({ where: { email: register.email }, select: ['id', 'password'] });
    if (userExists) {
      return ResponseHelper(h, "USER400");
    }

    return ResponseHelper(h, "USER200");

  } catch (ex) {
    return ResponseHelper(h, "SERVER500");
  }
};

export {
  LoginController,
  RegisterController,
};
