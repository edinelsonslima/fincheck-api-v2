import { ISignupBodySchema } from '@interfaces/auth';
import { IUserMapperPersistence } from '@interfaces/user';
import { IUserMapper, userMapper } from '@mappers/user';
import { IDatabase, db } from 'database';
import { categories } from 'database/categories';
import { CategoryError } from 'errors/category-error';
import { UserError } from 'errors/user-error';

interface ICreateUser extends ISignupBodySchema {}

class UserRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly factory: IUserMapper
  ) {}

  public async findOneById(userId: string) {
    try {
      const result = await this.db.query<IUserMapperPersistence>`
        SELECT TOP 1 name, email FROM users
        WHERE id = ${userId};
      `;

      return this.factory.toObject(result);
    } catch (error) {
      console.error(error);
      throw new UserError('error finding user');
    }
  }

  public async findOneByEmail(email: string) {
    try {
      const result = await this.db.query<IUserMapperPersistence>`
        SELECT TOP 1 * FROM users
        WHERE email = ${email};
      `;

      return this.factory.toObject(result);
    } catch (error) {
      console.error(error);
      throw new UserError('error finding user');
    }
  }

  public async create({ email, name, password }: ICreateUser) {
    try {
      const result = await this.db.query<IUserMapperPersistence>`
        INSERT INTO users (name, email, password)
        OUTPUT INSERTED.*
        VALUES (${name} , ${email} , ${password});
      `;

      const user = this.factory.toObject(result);

      if (!user) {
        return undefined;
      }

      await this.defaultCategories(user.id);

      return user;
    } catch (error) {
      console.error(error);
      throw new UserError('error creating user');
    }
  }

  private async defaultCategories(userId: string) {
    try {
      for (const category of categories) {
        await this.db.query`
          INSERT INTO categories (name, icon, type, user_id)
          VALUES (${category.name}, ${category.icon}, ${category.type}, ${userId});
        `;
      }
    } catch (error) {
      console.error(error);
      throw new CategoryError('error creating default categories for user');
    }
  }
}

export type IUserRepository = InstanceType<typeof UserRepository>;
export const userRepository = new UserRepository(db, userMapper);
