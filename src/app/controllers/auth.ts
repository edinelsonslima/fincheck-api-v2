import { IAuthService, authService } from '@services/auth';
import { Request, Response } from 'express';

class AuthController {
  constructor(private readonly authService: IAuthService) {
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
  }

  public async signin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const accessToken = await this.authService.signin({
        email,
        password,
      });

      res.status(201).json({ accessToken });
    } catch (error: any) {
      const err: Error = error;
      res.status(401).json({ message: err.message });
    }
  }

  public async signup(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;

      const { accessToken } = await this.authService.signup({
        name,
        email,
        password,
      });

      res.status(201).json({ accessToken });
    } catch (error: any) {
      const err: Error = error;
      res.status(400).json({ message: err.message });
    }
  }
}

export type IAuthController = InstanceType<typeof AuthController>;
export const authController = new AuthController(authService);
