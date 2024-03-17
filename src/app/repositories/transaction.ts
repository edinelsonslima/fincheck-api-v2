import { IBankAccountMapperPersistence } from '@interfaces/bank-account';
import { ICategoryMapperPersistence } from '@interfaces/category';
import {
  IFindTransactionsQuery,
  ITransactionMapperPersistence,
} from '@interfaces/transaction';
import { ITransactionMapper, transactionMapper } from '@mappers/transaction';
import { IDatabase, db } from 'database';

export interface ITransactionsJoinBankAccountsAndCategories
  extends ITransactionMapperPersistence,
    IBankAccountMapperPersistence,
    ICategoryMapperPersistence {}

class TransactionRepository {
  constructor(
    private readonly db: IDatabase,
    private readonly mapper: ITransactionMapper
  ) {}

  public async findAllByUserId(
    userId: string,
    { month, year, bankAccountId, type }: IFindTransactionsQuery
  ) {
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
  }
}

export type ITransactionRepository = InstanceType<typeof TransactionRepository>;
export const transactionRepository = new TransactionRepository(
  db,
  transactionMapper
);
