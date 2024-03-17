import { enStatusCode } from '@enums/status-code';
import { IRequest, IResponse } from '@interfaces/express';
import { IUser } from '@interfaces/user';
import { IUserService, userService } from '@services/user';

class UserController {
  constructor(private readonly userService: IUserService) {
    this.show = this.show.bind(this);
  }

  public async show(req: IRequest, res: IResponse<IUser>) {
    const user = await this.userService.getUserById(req.userId);
    return res.status(enStatusCode.OK).json(user);
  }
}

export type IUserController = InstanceType<typeof UserController>;
export const userController = new UserController(userService);
