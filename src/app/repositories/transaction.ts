import { IBankAccountMapperPersistence } from '@interfaces/bank-account';
import { ICategoryMapperPersistence } from '@interfaces/category';
import {
  ICreateTransactionBody,
  IFindTransactionsQuery,
  ITransactionMapperPersistence,
  IUpdateTransactionBody,
} from '@interfaces/transaction';
import { ITransactionMapper, transactionMapper } from '@mappers/transaction';
import { IDatabase, db } from 'database';
import { TransactionError } from 'mssql';

export interface ITransactionsJoinBankAccountsAndCategories
  extends ITransactionMapperPersistence,
    IBankAccountMapperPersistence,
    ICategoryMapperPersistence {}

class TransactionRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly mapper: ITransactionMapper
  ) {}

  public async findAllByUserId(userId: string, data: IFindTransactionsQuery) {
    try {
      const { month: monthIndex, year, bankAccountId, type } = data;
      const month = monthIndex + 1;

      const result = await this.db
        .query<ITransactionsJoinBankAccountsAndCategories>`
        SELECT * FROM transactions
        LEFT JOIN bank_accounts ON transactions.bank_account_id = bank_accounts.id
        LEFT JOIN categories ON transactions.category_id = categories.id
        WHERE transactions.user_id = ${userId}
        AND date >= DATEFROMPARTS(${year}, ${month}, 1)
        AND date < DATEADD(month, 1, DATEFROMPARTS(${year}, ${month}, 1))
        AND (transactions.type = COALESCE(${type ?? null}, transactions.type) OR ${type ?? null} IS NULL)
        AND (transactions.bank_account_id = COALESCE(${bankAccountId ?? null}, transactions.bank_account_id) OR ${bankAccountId ?? null} IS NULL)
      `;

      return this.mapper.toArray(result);
    } catch (error) {
      console.error(error);
      throw new TransactionError('error finding transactions');
    }
  }

  public async create(userId: string, data: ICreateTransactionBody) {
    try {
      const { name, type, bankAccountId, categoryId, date, value } = data;
      const result = await this.db.query<ITransactionMapperPersistence>`
        INSERT INTO transactions (name, type, bank_account_id, category_id, date, value, user_id)
        OUTPUT INSERTED.*
        VALUES (${name}, ${type}, ${bankAccountId}, ${categoryId}, ${date}, ${value}, ${userId})
      `;

      return this.mapper.toObject(result);
    } catch (error) {
      console.error(error);
      throw new TransactionError('error creating transaction');
    }
  }

  public async update(
    userId: string,
    transactionId: string,
    data: IUpdateTransactionBody
  ) {
    try {
      const { name, type, bankAccountId, categoryId, date, value } = data;
      const result = await this.db.query<ITransactionMapperPersistence>`
        UPDATE transactions
        SET name = ISNULL(${name ?? null}, name),
            type = COALESCE(${type ?? null}, type),
            bank_account_id = ISNULL(${bankAccountId ?? null}, bank_account_id),
            category_id = ISNULL(${categoryId ?? null}, category_id),
            date = ISNULL(${date ?? null}, date),
            value = ISNULL(${value ?? null}, value)
        OUTPUT INSERTED.*
        WHERE id = ${transactionId} AND user_id = ${userId}
      `;

      return this.mapper.toObject(result);
    } catch (error) {
      console.error(error);
      throw new TransactionError('error updating transaction');
    }
  }

  public async delete(userId: string, transactionId: string) {
    try {
      const result = await this.db.query`
        IF EXISTS (
          SELECT 1 FROM transactions
          WHERE transactions.user_id = ${userId} AND transactions.id = ${transactionId}
        )
        DELETE FROM transactions
        WHERE transactions.id = ${transactionId} AND transactions.user_id = ${userId}
      `;

      return result.rowsAffected.length > 0;
    } catch (error) {
      console.error(error);
      throw new TransactionError('error deleting transaction');
    }
  }
}

export type ITransactionRepository = InstanceType<typeof TransactionRepository>;
export const transactionRepository = new TransactionRepository(
  db,
  transactionMapper
);
