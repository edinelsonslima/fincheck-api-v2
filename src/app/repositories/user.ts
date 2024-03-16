import { ISignupBodySchema } from '@interfaces/auth';
import { IUser } from '@interfaces/user';
import { IUserFactory, userFactory } from '@mappers/user';
import { IDatabase, db } from 'database';
import { categories } from 'database/categories';

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

    const user = this.factory.toObject(result);

    if (!user) {
      return undefined;
    }

    // default categories for new user
    for (const category of categories) {
      await this.db.query`
        INSERT INTO categories (name, icon, type, user_id)
        VALUES (${category.name}, ${category.icon}, ${category.type}, ${user.id});
      `;
    }

    return user;
  }
}

export type IUserRepository = InstanceType<typeof UserRepository>;
export const userRepository = new UserRepository(db, userFactory);
