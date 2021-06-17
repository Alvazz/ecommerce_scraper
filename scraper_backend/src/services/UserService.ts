import { IRegister, IUserModel } from "../interfaces";
import { User } from "../entity/User";

import { BaseService } from "./BaseService";
import { UserHelper } from "../helpers/UserHelper";

export class UserService extends BaseService {

  userHelper: UserHelper;

  constructor() {
    super(User);
    this.userHelper = new UserHelper();
  }
  
  public findUserByEmail (email: string, fields: any): Promise<IUserModel> {
    return this.entityRepository.findOne({
      where: { email },
      select: fields,
    });
  }

  public async createUser (register: IRegister): Promise<void> {
    
    const user: User = this.entityRepository.create({
      first_name: register.first_name,
      last_name: register.last_name,
      email: register.email,
    }) as User;

    user.password = this.userHelper.hashPassword(register.password);
    await this.entityRepository.save(user);

  }
  
};
