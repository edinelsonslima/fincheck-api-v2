import {
  IBankAccountMapperPersistence,
  ICreateBankAccountBody,
  IUpdateBankAccountBody,
} from '@interfaces/bank-account';
import { IBankAccountMapper, bankAccountMapper } from '@mappers/bank-account';
import { IDatabase, db } from 'database';

interface ICreateBankAccount extends ICreateBankAccountBody {
  userId: string;
}

class BankAccountRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly mapper: IBankAccountMapper
  ) {}

  public async findAllByUserId(userId: string) {
    const result = await this.db.query<IBankAccountMapperPersistence>`
      SELECT * FROM bank_accounts
      LEFT JOIN transactions ON bank_accounts.id = transactions.bank_account_id
      WHERE bank_accounts.user_id = ${userId};
    `;

    return this.mapper.toArray(result);
  }

  public async create({
    color,
    initialBalance,
    name,
    type,
    userId,
  }: ICreateBankAccount) {
    const result = await this.db.query<IBankAccountMapperPersistence>`
      INSERT INTO bank_accounts (name, initial_balance, type, color, user_id)
      OUTPUT INSERTED.*
      VALUES (${name}, ${initialBalance}, ${type}, ${color}, ${userId})
    `;

    return this.mapper.toObject(result);
  }

  public async findOneByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string
  ) {
    const result = await this.db.query<IBankAccountMapperPersistence>`
      SELECT TOP 1 * FROM bank_accounts
      WHERE bank_accounts.user_id = ${userId} AND bank_accounts.id = ${bankAccountId};
    `;

    return this.mapper.toObject(result);
  }

  public async updateByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string,
    { color, initialBalance, name, type }: IUpdateBankAccountBody
  ) {
    const result = await this.db.query<IBankAccountMapperPersistence>`
      UPDATE bank_accounts
      SET name = ISNULL(${name ?? null}, name),
          initial_balance = ISNULL(${initialBalance ?? null}, initial_balance),
          color = ISNULL(${color ?? null}, color),
          type = COALESCE(${type ?? null}, type)
      OUTPUT INSERTED.*
      WHERE bank_accounts.user_id = ${userId} AND bank_accounts.id = ${bankAccountId};
    `;

    return this.mapper.toObject(result);
  }

  public async deleteByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string
  ) {
    const result = await this.db.query<IBankAccountMapperPersistence>`
      IF EXISTS (
        SELECT 1 FROM bank_accounts
        WHERE bank_accounts.user_id = ${userId} AND bank_accounts.id = ${bankAccountId}
      )
      DELETE FROM bank_accounts
      WHERE bank_accounts.user_id = ${userId} AND bank_accounts.id = ${bankAccountId};
    `;

    return result.rowsAffected.length > 0;
  }
}

export type IBankAccountRepository = InstanceType<typeof BankAccountRepository>;
export const bankAccountRepository = new BankAccountRepository(
  db,
  bankAccountMapper
);
