import { sanitizeObject } from '@helpers/sanitize-object';
import { separateJoins } from '@helpers/separate-joins';
import { snake2camel } from '@helpers/snake-to-camel';
import {
  IBankAccount,
  IBankAccountMapperPersistence,
} from '@interfaces/bank-account';
import { IBankAccountJoinTransactions } from '@repositories/bank-account';
import { IResult } from 'mssql';
import { transactionMapper } from './transaction';

const BANK_ACCOUNT_VALUE = 0;
const TRANSACTION_VALUE = 1;

class BankAccountMapper {
  public toObject(queryResult: IResult<IBankAccountMapperPersistence>) {
    const query = queryResult as IResult<IBankAccountJoinTransactions>;
    const bankAccounts = this.getBankAccounts(query);

    if (!bankAccounts) {
      return undefined;
    }

    const [firstBankAccount] = bankAccounts;

    return firstBankAccount;
  }

  public toArray(queryResult: IResult<IBankAccountJoinTransactions>) {
    return this.getBankAccounts(queryResult);
  }

  public toDomain(bankAccount: IBankAccountMapperPersistence) {
    return sanitizeObject(snake2camel(bankAccount)) as unknown as IBankAccount;
  }

  private getBankAccounts(queryResult: IResult<IBankAccountJoinTransactions>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset?.reduce((acc, data) => {
      if (!Array.isArray(data.id)) {
        return [...acc, { ...this.toDomain(data), transactions: [] }];
      }

      const bankAccount = this.toDomain(
        separateJoins('bankAccount', BANK_ACCOUNT_VALUE, data)
      );

      const transaction = transactionMapper.toDomain(
        separateJoins('transaction', TRANSACTION_VALUE, data)
      );

      const bankAccountIndex = acc.findIndex(({ id }) => id === bankAccount.id);

      if (bankAccountIndex === -1) {
        return [...acc, { ...bankAccount, transactions: [transaction] }];
      }

      acc[bankAccountIndex].transactions.push(transaction);

      return acc;
    }, [] as IBankAccount[]);
  }
}

export type IBankAccountMapper = InstanceType<typeof BankAccountMapper>;
export const bankAccountMapper = new BankAccountMapper();
