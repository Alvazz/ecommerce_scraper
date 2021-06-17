import * as jsonwebtoken from "jsonwebtoken";
import * as bcryptjs from "bcryptjs";

import { IUserModel } from "../interfaces";
import { Environment } from "../config";

export class UserHelper {

  public hashPassword(password): string {
    const salt = bcryptjs.genSaltSync(10); // salt
    return bcryptjs.hashSync(password, salt);
  }

  public comparePassword(password: string, hash: string): boolean {
    return bcryptjs.compareSync(password, hash);
  }

  public createToken(payload: IUserModel): string {
    return jsonwebtoken.sign(payload, Environment.SECRET, {
      expiresIn: 3600,
    });
  }

  public verifyToken(token: string): Object | IUserModel {
    try {
      return jsonwebtoken.verify(token, Environment.SECRET);
    } catch (ex) {
      return null;
    }
  }

  public generateOtp(): number {
    return Math.floor(100000 + Math.random() * 900000);
  }

};
