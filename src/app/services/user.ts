import { IUserRepository, userRepository } from '@repositories/user';

class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public async getUserById(userId: string) {
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const { email, name } = user;
    return { email, name };
  }
}

export type IUserService = InstanceType<typeof UserService>;
export const userService = new UserService(userRepository);
