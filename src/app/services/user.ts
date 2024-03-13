import { IUserRepository, userRepository } from '@repositories/users';

class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  public getUserById(userId: string) {
    return this.userRepository.findOneById(userId);
  }
}

export type IUserService = InstanceType<typeof UserService>;
export const userService = new UserService(userRepository);
