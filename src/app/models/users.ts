import { IUser, IUserFactory, userFactory } from 'app/factories/user';
import { IDatabase, db } from 'database/database';

interface IUserCreate {
  name: string;
  email: string;
  password: string;
}

class UserModel {
  constructor(
    private readonly db: IDatabase,
    private readonly factory: IUserFactory
  ) {
    this.db.createTable('users');
  }

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

  public async create({ email, name, password }: IUserCreate) {
    const result = await this.db.query<IUser>`
      INSERT INTO users (name, email, password)
      OUTPUT INSERTED.*
      VALUES (${name} , ${email} , ${password});
    `;

    return this.factory.toObject(result);
  }
}

export type IUserModel = InstanceType<typeof UserModel>;
export const userModel = new UserModel(db, userFactory);
