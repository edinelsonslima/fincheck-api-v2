import { sanitizeObject } from '@helpers/sanitize-object';
import { separateJoins } from '@helpers/separete-joins';
import { snake2camel } from '@helpers/snake-to-camel';
import {
  ITransaction,
  ITransactionMapperPersistence,
} from '@interfaces/transaction';
import { ITransactionsJoinBankAccountsAndCategories } from '@repositories/transaction';
import { IResult } from 'mssql';
import { bankAccountMapper } from './bank-account';
import { categoryMapper } from './category';

const TRANSACTION_VALUE = 0;
const BANK_ACCOUNT_VALUE = 1;
const CATEGORIES_VALUE = 2;

interface IQueryResult
  extends IResult<
    ITransactionMapperPersistence | ITransactionsJoinBankAccountsAndCategories
  > {}

class TransactionMapper {
  constructor() {
    this.toDomain = this.toDomain.bind(this);
  }

  public toObject(queryResult: IQueryResult) {
    const transactions = this.getTransactions(queryResult);

    if (!transactions) {
      return undefined;
    }

    const [firstTransaction] = transactions;

    return firstTransaction;
  }

  public toArray(queryResult: IQueryResult) {
    return this.getTransactions(queryResult);
  }

  public toDomain(transaction: ITransactionMapperPersistence) {
    return sanitizeObject(snake2camel(transaction)) as unknown as ITransaction;
  }

  private getTransactions(queryResult: IQueryResult) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.reduce((acc, data) => {
      if (!Array.isArray(data.id)) {
        return [...acc, { ...this.toDomain(data) }];
      }

      const transaction = this.toDomain(
        separateJoins('transaction', TRANSACTION_VALUE, data)
      );

      const category = categoryMapper.toDomain(
        separateJoins(
          'category',
          CATEGORIES_VALUE,
          data
        ) as ITransactionsJoinBankAccountsAndCategories
      );

      const bankAccount = bankAccountMapper.toDomain(
        separateJoins(
          'bankAccount',
          BANK_ACCOUNT_VALUE,
          data
        ) as ITransactionsJoinBankAccountsAndCategories
      );

      return [...acc, { ...transaction, category, bankAccount }];
    }, [] as ITransaction[]);
  }
}

export type ITransactionMapper = InstanceType<typeof TransactionMapper>;
export const transactionMapper = new TransactionMapper();
