import { ISignupBodySchema } from '@interfaces/auth';
import { IUser } from '@interfaces/user';
import { IUserFactory, userFactory } from 'app/factories/user';
import { IDatabase, db } from 'database';

interface ICreateUser extends ISignupBodySchema {}

class UserRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly factory: IUserFactory
  ) {}

  public async findOneById(userId: string) {
    const result = await this.db.query<IUser>`
      SELECT TOP 1 * FROM users
      WHERE id = ${userId};
    `;

    return this.factory.toObject(result);
  }

  public async findOneByEmail(email: string) {
    const result = await this.db.query<IUser>`
      SELECT TOP 1 * FROM users
      WHERE email = ${email};
    `;

    return this.factory.toObject(result);
  }

  public async create({ email, name, password }: ICreateUser) {
    const result = await this.db.query<IUser>`
      INSERT INTO users (name, email, password)
      OUTPUT INSERTED.*
      VALUES (${name} , ${email} , ${password});
    `;

    return this.factory.toObject(result);
  }
}

export type IUserRepository = InstanceType<typeof UserRepository>;
export const userRepository = new UserRepository(db, userFactory);
