import { Server } from "@hapi/hapi";
import { AuthController } from "../controllers";
import { LoginValidation, RegisterValidation } from "../validations";

export class AuthRoutes {

  authController: AuthController;
  routes: Array<any>;

  constructor() {

    this.authController = new AuthController();

    this.routes = [
      {
        method: "POST",
        path: "/auth/login",
        config: {
          auth: false,
          description: "User Login",
          tags: ["api"],
          handler: this.authController.loginController,
          validate: LoginValidation,
        }
      },
      {
        method: "POST",
        path: "/auth/register",
        config: {
          auth: false,
          description: "User Registration",
          tags: ["api"],
          handler: this.authController.registerController,
          validate: RegisterValidation,
        }
      }
    ];

  }

  public getRoutes(): Object | any {
    return {
      name: "routes",
      register: (server: Server) => { server.route(this.routes) },
    }
  }

};
