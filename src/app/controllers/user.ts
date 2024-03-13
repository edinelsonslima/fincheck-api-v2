import { IUserService, userService } from '@services/user';
import { Request, Response } from 'express';

class UserController {
  constructor(private readonly userService: IUserService) {
    this.me = this.me.bind(this);
  }

  public async me(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const user = await this.userService.getUserById(userId);

      res.status(200).json(user);
    } catch (error: any) {
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }
}

export type IUserController = InstanceType<typeof UserController>;
export const userController = new UserController(userService);
