import { IUserRepository, userRepository } from 'app/repositories/users';
import { env } from 'app/settings';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface IAuthSignin {
  email: string;
  password: string;
}

interface IAuthSignup {
  name: string;
  email: string;
  password: string;
}

class AuthService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async signin({ email, password }: IAuthSignin) {
    const user = await this.userRepository.findOneByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    const accessToken = sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    return accessToken;
  }

  public async signup({ email, name, password }: IAuthSignup) {
    const userExists = await this.userRepository.findOneByEmail(email);

    if (userExists) {
      throw new Error('This email is already in use');
    }

    const hashedPassword = await hash(password, 10);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      throw new Error('Error creating user');
    }

    const accessToken = sign({ userId: user.id }, env.JWT_SECRET, {
      expiresIn: '1 day',
    });

    return { accessToken };
  }
}

export type IAuthService = InstanceType<typeof AuthService>;
export const authService = new AuthService(userRepository);
