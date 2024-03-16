import {
  IBankAccountFactory,
  bankAccountFactory,
} from '@factories/bank-account';
import { IBankAccount, ICreateBankAccountBody } from '@interfaces/bank-account';
import { IDatabase, db } from 'database/database';

interface ICreateBankAccount extends ICreateBankAccountBody {
  userId: string;
}

class BankAccountRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly factory: IBankAccountFactory
  ) {}

  public async findAllByUserId(userId: string) {
    const result = await this.db.query<IBankAccount>`
      SELECT bank_accounts.*, transactions.type, transactions.name FROM bank_accounts
      INNER JOIN transactions ON bank_accounts.id = transactions.bank_account_id
      WHERE bank_accounts.user_id = ${userId};
    `;

    return this.factory.toArray(result);
  }

  public async create({
    color,
    initialBalance,
    name,
    type,
    userId,
  }: ICreateBankAccount) {
    const result = await this.db.query<IBankAccount>`
      INSERT INTO bank_accounts (name, initial_balance, type, color, user_id)
      OUTPUT INSERTED.*
      VALUES (${name}, ${initialBalance}, ${type}, ${color}, ${userId})
    `;

    return this.factory.toObject(result);
  }
}

export type IBankAccountRepository = InstanceType<typeof BankAccountRepository>;
export const bankAccountRepository = new BankAccountRepository(
  db,
  bankAccountFactory
);
