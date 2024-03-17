import { enStatusCode } from '@enums/status-code';
import { IUserRepository, userRepository } from '@repositories/user';
import { UserError } from 'errors/user-error';

class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async getUserById(userId: string) {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new UserError('user not found', enStatusCode.NOT_FOUND);
    }

    return user;
  }
}

export type IUserService = InstanceType<typeof UserService>;
export const userService = new UserService(userRepository);
