import { enStatusCode } from '@enums/status-code';
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
    const accessToken = await this.authService.signin(req.body);
    return res.status(enStatusCode.CREATED).json({ accessToken });
  }

  public async signup(
    req: IRequest<ISignupBodySchema>,
    res: IResponse<{ accessToken: string }>
  ) {
    const { accessToken } = await this.authService.signup(req.body);
    return res.status(enStatusCode.CREATED).json({ accessToken });
  }
}

export type IAuthController = InstanceType<typeof AuthController>;
export const authController = new AuthController(authService);
