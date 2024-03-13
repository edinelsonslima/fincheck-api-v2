import { IResult } from 'mssql';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

class UserFactory {
  public toObject(queryResult: IResult<IUser>) {
    const users = this.getUsers(queryResult);

    if (!users) {
      return undefined;
    }

    const [firstUser] = users;

    return {
      ...firstUser,
    };
  }

  public toArray(queryResult: IResult<IUser>) {
    const users = this.getUsers(queryResult);

    if (!users) {
      return undefined;
    }

    return {
      ...users,
    };
  }

  private getUsers(queryResult: IResult<IUser>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.format);
  }

  private format(user: IUser) {
    return {
      ...user,
      ...(user?.created_at && { created_at: new Date(user?.created_at) }),
      ...(user?.updated_at && { updated_at: new Date(user?.updated_at) }),
    };
  }
}

export type IUserFactory = InstanceType<typeof UserFactory>;
export const userFactory = new UserFactory();
