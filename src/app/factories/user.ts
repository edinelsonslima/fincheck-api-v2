import { IResult } from 'mssql';

export interface IUser {
  id: string;
  name: string;
  email: string;
  categories: any[];
  bankAccounts: any[];
  transactions: any[];
}

class UserFactory {
  private id: string;
  private name: string;
  private email: string;
  private categories: any[];
  private bankAccounts: any[];
  private transactions: any[];

  constructor(private readonly user: IResult<IUser>) {
    this.id = user.recordset[0].id;
    this.name = user.recordset[0].name;
    this.email = user.recordset[0].email;
    this.categories = user.recordset[0].categories;
    this.bankAccounts = user.recordset[0].bankAccounts;
    this.transactions = user.recordset[0].transactions;
  }

  public get Id() {
    return this.id;
  }

  public get Name() {
    return this.name;
  }

  public get Email() {
    return this.email;
  }

  public get Categories() {
    return this.categories;
  }

  public get BankAccounts() {
    return this.bankAccounts;
  }

  public get Transactions() {
    return this.transactions;
  }

  public set Id(id: string) {
    this.id = id;
  }

  public set Name(name: string) {
    this.name = name;
  }

  public set Email(email: string) {
    this.email = email;
  }

  public set Categories(categories: any[]) {
    this.categories = categories;
  }

  public set BankAccounts(bankAccounts: any[]) {
    this.bankAccounts = bankAccounts;
  }

  public set Transactions(transactions: any[]) {
    this.transactions = transactions;
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      categories: this.categories,
      bankAccounts: this.bankAccounts,
      transactions: this.transactions,
    };
  }
}

export type IUserFactory = typeof UserFactory;
export { UserFactory };
