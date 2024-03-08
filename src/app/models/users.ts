import { db, type IDatabase } from '@services/database';
import { IUser, IUserFactory, UserFactory } from 'app/factories/user';

interface IGetUser {
  id?: string;
  email?: string;
  name?: string;
}

class UserModel {
  constructor(
    private readonly db: IDatabase,
    private readonly userFactory: IUserFactory
  ) {
    this.db = db;

    this.db.query`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY NOT NULL UNIQUE DEFAULT NEWID(),
        name VARCHAR(255),
        email VARCHAR(255) unique,
        password VARCHAR(255),
        created_at DATETIME DEFAULT GETDATE(),
        updated_at DATETIME DEFAULT GETDATE(),
      )
    `;
  }

  public async get<T extends IUser>(filter?: IGetUser) {
    try {
      filter = JSON.parse(JSON.stringify(filter));

      if (!filter) {
        const users = await this.db.query<T>`
          SELECT *
          FROM users;
        `;

        return new this.userFactory(users).toJSON();
      }

      const user = await this.db.query<T>`
        SELECT *
        FROM users
        WHERE id = ${filter.id};
      `;

      return new this.userFactory(user).toJSON();
    } catch {
      return null;
    }
  }

  public create(name: string, email: string, password: string) {
    return this.db.query`
      INSERT INTO users (name, email, password, created_at, updated_at)
      VALUES (${name}, ${email}, ${password}, GETDATE(), GETDATE());
    `;
  }

  public update(id: string, name: string, email: string, password: string) {
    return this.db.query`
      UPDATE users
      SET name = ${name}, email = ${email}, password = ${password}, updated_at = GETDATE()
      WHERE id = ${id};
    `;
  }

  public delete(id: string) {
    return this.db.query`
      DELETE FROM users
      WHERE id = ${id};
    `;
  }
}

const userModel = new UserModel(db, UserFactory);

export type IUserModel = InstanceType<typeof UserModel>;
export { userModel };
