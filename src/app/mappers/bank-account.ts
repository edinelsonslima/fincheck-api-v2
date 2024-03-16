import { enBankAccountType } from '@enums/bank-account';
import { enTransactionType } from '@enums/transaction';
import {
  IBankAccountMapperDomain,
  IBankAccountMapperPersistence,
} from '@interfaces/bank-account';
import { IResult } from 'mssql';

const BANK_ACCOUNT_VALUE = 0;
const TRANSACTION_VALUE = 1;

class BankAccountMapper {
  constructor() {
    this.toDomain = this.toDomain.bind(this);
  }

  public toObject(queryResult: IResult<IBankAccountMapperPersistence>) {
    const bankAccounts = this.getBankAccounts(queryResult);

    if (!bankAccounts) {
      return undefined;
    }

    const [firstBankAccount] = bankAccounts;

    return firstBankAccount;
  }

  public toArray(queryResult: IResult<IBankAccountMapperPersistence>) {
    const bankAccounts = this.getBankAccounts(queryResult);
    return bankAccounts;
  }

  private getBankAccounts(queryResult: IResult<IBankAccountMapperPersistence>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset?.reduce((acc, bankAccount) => {
      const bank = this.toDomain(bankAccount);
      const bankIndex = acc.findIndex(({ id }) => bank.id === id);

      if (bankIndex === -1) {
        const { transaction, ...restBank } = bank;
        const transactions = transaction ? [transaction] : [];
        acc.push({ ...restBank, transactions });
        return acc;
      }

      if (bank.transaction?.bankAccountId === acc[bankIndex].id) {
        const transaction = bank.transaction;
        acc[bankIndex].transactions.push(transaction!);
      }

      return acc;
    }, [] as IBankAccountMapperDomain[]);
  }

  private toDomain(bankAccount: IBankAccountMapperPersistence) {
    const parsedTransaction = this.sanitizeObject({
      id: bankAccount.id[TRANSACTION_VALUE],
      value: Number(bankAccount.value),
      date: new Date(bankAccount.date),
      categoryId: bankAccount.category_id,
      bankAccountId: bankAccount.bank_account_id,
      createdAt: new Date(bankAccount.created_at[TRANSACTION_VALUE]),
      updatedAt: new Date(bankAccount.updated_at[TRANSACTION_VALUE]),
      name: bankAccount.name[TRANSACTION_VALUE],
      type: bankAccount.type[TRANSACTION_VALUE] as enTransactionType,
      userId: bankAccount.user_id[TRANSACTION_VALUE],
    });

    return this.sanitizeObject({
      id: bankAccount.id[BANK_ACCOUNT_VALUE],
      name: bankAccount.name[BANK_ACCOUNT_VALUE],
      type: bankAccount.type[BANK_ACCOUNT_VALUE] as enBankAccountType,
      userId: bankAccount.user_id[BANK_ACCOUNT_VALUE],
      createdAt: new Date(bankAccount.created_at[BANK_ACCOUNT_VALUE]),
      updatedAt: new Date(bankAccount.updated_at[BANK_ACCOUNT_VALUE]),
      color: bankAccount.color,
      initialBalance: bankAccount.initial_balance,
      transaction: parsedTransaction,
    });
  }

  private sanitizeObject<T extends object>(obj: T) {
    const invalid = [undefined, null, ''];
    const cleared = Object.entries(obj).filter(([, v]) => !invalid.includes(v));
    return Object.fromEntries(cleared) as Partial<T>;
  }
}

export type IBankAccountMapper = InstanceType<typeof BankAccountMapper>;
export const bankAccountMapper = new BankAccountMapper();
