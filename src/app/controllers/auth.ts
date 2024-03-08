import { IUserModel, userModel } from '@models/users';
import { Request, Response } from 'express';

class AuthController {
  constructor(private readonly userModel: IUserModel) {}

  public signin = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await this.userModel.get({
      email: 'teste@gmail.com',
      id: '123',
      name: 'teste',
    });
    res.json(user);
  };

  public async signup(req: Request, res: Response) {}
}

const authController = new AuthController(userModel);

export { authController };
