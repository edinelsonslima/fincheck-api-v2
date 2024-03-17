import { sanitizeObject } from '@helpers/sanitize-object';
import { snake2camel } from '@helpers/snake-to-camel';
import { IUser, IUserMapperPersistence } from '@interfaces/user';
import { IResult } from 'mssql';

class UserMapper {
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

  public toDomain(user: IUserMapperPersistence) {
    return sanitizeObject(snake2camel(user)) as unknown as IUser;
  }

  private getUsers(queryResult: IResult<IUserMapperPersistence>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.toDomain);
  }
}

export type IUserMapper = InstanceType<typeof UserMapper>;
export const userMapper = new UserMapper();
