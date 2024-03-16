import { enBankAccountType } from '@enums/bank-account';
import { enTransactionType } from '@enums/transaction';
import {
  IBankAccount,
  IBankAccountMapperDomain,
  IBankAccountMapperPersistence,
} from '@interfaces/bank-account';
import { ITransaction } from '@interfaces/transaction';
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
        const { transaction, ...rest } = bank;
        acc.push({ ...rest, transactions: transaction ? [transaction] : [] });
        return acc;
      }

      if (bank?.transaction?.bankAccountId === acc[bankIndex].id) {
        const transaction = bank.transaction;
        acc[bankIndex].transactions.push(transaction);
      }

      return acc;
    }, [] as IBankAccountMapperDomain[]);
  }

  private toDomain(bank: IBankAccountMapperPersistence) {
    const transaction = this.sanitizeObject<ITransaction>({
      id: this.getValue(bank.id, TRANSACTION_VALUE),
      value: this.getValue(bank.value, TRANSACTION_VALUE),
      date: new Date(this.getValue(bank.date, TRANSACTION_VALUE)),
      categoryId: this.getValue(bank.category_id, TRANSACTION_VALUE),
      bankAccountId: this.getValue(bank.bank_account_id, TRANSACTION_VALUE),
      createdAt: new Date(this.getValue(bank.created_at, TRANSACTION_VALUE)),
      updatedAt: new Date(this.getValue(bank.updated_at, TRANSACTION_VALUE)),
      name: this.getValue(bank.name, TRANSACTION_VALUE),
      type: this.getValue(bank.type, TRANSACTION_VALUE) as enTransactionType,
      userId: this.getValue(bank.user_id, TRANSACTION_VALUE),
    });

    const bankAccount = this.sanitizeObject<IBankAccount>({
      id: this.getValue(bank.id, BANK_ACCOUNT_VALUE),
      name: this.getValue(bank.name, BANK_ACCOUNT_VALUE),
      type: this.getValue(bank.type, BANK_ACCOUNT_VALUE) as enBankAccountType,
      userId: this.getValue(bank.user_id, BANK_ACCOUNT_VALUE),
      createdAt: new Date(this.getValue(bank.created_at, BANK_ACCOUNT_VALUE)),
      updatedAt: new Date(this.getValue(bank.updated_at, BANK_ACCOUNT_VALUE)),
      color: this.getValue(bank.color, BANK_ACCOUNT_VALUE),
      initialBalance: this.getValue(bank.initial_balance, BANK_ACCOUNT_VALUE),
    });

    return {
      ...bankAccount,
      transaction: Array.isArray(bank.id) ? transaction : undefined,
    };
  }

  private getValue<T>(value: T, type: number) {
    return Array.isArray(value) ? value[type] : value;
  }

  private sanitizeObject<T extends object>(obj: T) {
    const invalid = ['', 'undefined', 'null', 'Invalid Date', 'NaN'];
    const entries = Object.entries(obj);
    const cleared = entries.filter(([, v]) => !invalid.includes(String(v)));
    return Object.fromEntries(cleared) as T;
  }
}

export type IBankAccountMapper = InstanceType<typeof BankAccountMapper>;
export const bankAccountMapper = new BankAccountMapper();
