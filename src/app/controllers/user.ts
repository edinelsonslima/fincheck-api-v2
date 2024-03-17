import { IRequest, IResponse } from '@interfaces/express';
import { IUser } from '@interfaces/user';
import { IUserService, userService } from '@services/user';

class UserController {
  constructor(private readonly userService: IUserService) {
    this.show = this.show.bind(this);
  }

  public async show(req: IRequest, res: IResponse<IUser>) {
    try {
      const user = await this.userService.getUserById(req.userId);

      return res.status(200).json(user);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }
}

export type IUserController = InstanceType<typeof UserController>;
export const userController = new UserController(userService);
