import { ISigninBodySchema, ISignupBodySchema } from '@interfaces/auth';
import { IRequest, IResponse } from '@interfaces/express';
import { IAuthService, authService } from '@services/auth';

class AuthController {
  constructor(private readonly authService: IAuthService) {
    this.signin = this.signin.bind(this);
    this.signup = this.signup.bind(this);
  }

  public async signin(
    req: IRequest<ISigninBodySchema>,
    res: IResponse<{ accessToken: string }>
  ) {
    try {
      const accessToken = await this.authService.signin(req.body);

      return res.status(201).json({ accessToken });
    } catch (error: any) {
      const err: Error = error;
      return res.status(401).json({ message: err.message });
    }
  }

  public async signup(
    req: IRequest<ISignupBodySchema>,
    res: IResponse<{ accessToken: string }>
  ) {
    try {
      const { accessToken } = await this.authService.signup(req.body);

      return res.status(201).json({ accessToken });
    } catch (error: any) {
      const err: Error = error;
      return res.status(400).json({ message: err.message });
    }
  }
}

export type IAuthController = InstanceType<typeof AuthController>;
export const authController = new AuthController(authService);
