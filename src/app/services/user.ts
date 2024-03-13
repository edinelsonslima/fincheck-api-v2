import { IUserModel, userModel } from '@models/users';

class UserService {
  constructor(private readonly userModel: IUserModel) {}

  public getUserById(userId: string) {
    return this.userModel.findOneById(userId);
  }
}

export type IUserService = InstanceType<typeof UserService>;
export const userService = new UserService(userModel);
