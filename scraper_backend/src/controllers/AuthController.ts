import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

import { ResponseHelper } from "../helpers/ResponseHelper";
import { UserHelper } from "../helpers/UserHelper";
import { ILogin, IRegister, IUserModel } from "../interfaces";
import { UserService } from "../services/UserService";

export class AuthController {

  private responseHelper: ResponseHelper;
  private userService: UserService;
  private userHelper: UserHelper;

  constructor() {
    this.responseHelper = new ResponseHelper();
    this.userService = new UserService();
    this.userHelper = new UserHelper();
  }

  public loginController = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {

      const login: ILogin = req.payload as ILogin;
      const userExists: IUserModel = await this.userService.findUserByEmail(
        login.email, 
        ['id', 'email', 'password', 'is_active']
      );

      if (!userExists) {
        return this.responseHelper.error(h, "USER404");
      }

      if (userExists && !userExists.is_active) {
        return this.responseHelper.error(h, "USER400");
      }

      if (!this.userHelper.comparePassword(login.password, userExists.password)) {
        return this.responseHelper.error(h, "LOGIN403");
      }

      // create a token for the user.
      const token = this.userHelper.createToken({ id: userExists.id } as IUserModel);

      return this.responseHelper.success(h, "LOGIN200", { token });

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500", ex);
    }
  }

  public registerController = async (req: Request, h: ResponseToolkit): Promise<ResponseObject> => {
    try {
        
      const register: IRegister = req.payload as IRegister;
      const userExists: IUserModel = await this.userService.findUserByEmail(register.email, ['id', 'email', 'password']);
      if (userExists) {
        return this.responseHelper.success(h, "USER400");
      }

      // Hashpassword for the user.
      await this.userService.createUser(register);

      return this.responseHelper.success(h, "USER200");

    } catch (ex) {
      return this.responseHelper.error(h, "SERVER500");
    }
  }
};
