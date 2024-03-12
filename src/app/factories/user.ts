import { IResult } from 'mssql';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;

  categories: any[];
  bankAccounts: any[];
  transactions: any[];
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

  private format({ created_at, updated_at, ...user }: IUser) {
    return {
      ...user,
      created_at: new Date(created_at),
      updated_at: new Date(updated_at),
    };
  }
}

export type IUserFactory = InstanceType<typeof UserFactory>;

const userFactory = new UserFactory();
export { userFactory };
