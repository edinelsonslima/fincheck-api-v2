import {
  IBankAccountFactory,
  bankAccountFactory,
} from '@factories/bank-account';
import { IBankAccount } from '@interfaces/bank-account';
import { IDatabase, db } from 'database/database';

class BankAccountRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly factory: IBankAccountFactory
  ) {}

  public async findAllByUserId(userId: string) {
    const result = await this.db.query<IBankAccount>`
      SELECT * FROM bank_accounts
      INNER JOIN transactions ON bank_accounts.id = transactions.bank_account_id
      WHERE bank_accounts.user_id = ${userId};
    `;

    return this.factory.toArray(result);
  }
}

export type IBankAccountRepository = InstanceType<typeof BankAccountRepository>;
export const bankAccountRepository = new BankAccountRepository(
  db,
  bankAccountFactory
);
