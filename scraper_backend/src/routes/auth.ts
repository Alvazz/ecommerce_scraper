import { Server } from "@hapi/hapi";

import { AuthController } from "../controllers";
import { LoginValidation, RegisterValidation } from "../validations";

export const AuthRoutes = { 

  name: "auth",
  register: (server: Server) => {

    const routes: Array<any> = [
      {
        method: "POST",
        path: "/auth/login",
        config: {
          auth: false,
          description: "User Login",
          tags: ["api"],
          handler: AuthController.LoginController,
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
          handler: AuthController.RegisterController,
          validate: RegisterValidation,
        }
      }
    ];

    server.route(routes);

  },
};
