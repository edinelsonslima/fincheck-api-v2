import { IUserMapperDomain, IUserMapperPersistence } from '@interfaces/user';
import { IResult } from 'mssql';

class UserFactory {
  constructor() {
    this.toDomain = this.toDomain.bind(this);
  }

  public toObject(queryResult: IResult<IUserMapperPersistence>) {
    const users = this.getUsers(queryResult);

    if (!users) {
      return undefined;
    }

    const [firstUser] = users;

    return firstUser;
  }

  public toArray(queryResult: IResult<IUserMapperPersistence>) {
    const users = this.getUsers(queryResult);
    return users;
  }

  private getUsers(queryResult: IResult<IUserMapperPersistence>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.toDomain);
  }

  private toDomain(user: IUserMapperPersistence): IUserMapperDomain {
    return this.sanitizeObject({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      createdAt: new Date(user.created_at),
      updatedAt: new Date(user.updated_at),
    });
  }

  private sanitizeObject<T extends object>(obj: T) {
    const invalid = ['', 'undefined', 'null', 'Invalid Date', 'NaN'];
    const entries = Object.entries(obj);
    const cleared = entries.filter(([, v]) => !invalid.includes(String(v)));
    return Object.fromEntries(cleared) as T;
  }
}

export type IUserFactory = InstanceType<typeof UserFactory>;
export const userFactory = new UserFactory();
