import { enBankAccountType } from '@enums/bank-account';
import { IBankAccount } from '@interfaces/bank-account';
import { IResult } from 'mssql';

class BankAccountFactory {
  public toObject(queryResult: IResult<IBankAccount>) {
    const bankAccounts = this.getBankAccounts(queryResult);

    if (!bankAccounts) {
      return undefined;
    }

    const [firstUser] = bankAccounts;

    return {
      ...firstUser,
    };
  }

  public toArray(queryResult: IResult<IBankAccount>) {
    const bankAccounts = this.getBankAccounts(queryResult);
    return bankAccounts;
  }

  private getBankAccounts(queryResult: IResult<IBankAccount>) {
    if (!queryResult.recordset?.length) {
      return undefined;
    }

    return queryResult.recordset.map(this.format);
  }

  private format(bankAccount: IBankAccount): IBankAccount {
    return {
      ...bankAccount,
      ...(bankAccount?.type && { type: enBankAccountType[bankAccount.type] }),
      ...(bankAccount?.initialBalance && {
        initialBalance: Number(bankAccount.initialBalance),
      }),
      ...(bankAccount?.created_at && {
        created_at: new Date(bankAccount?.created_at),
      }),
      ...(bankAccount?.updated_at && {
        updated_at: new Date(bankAccount?.updated_at),
      }),
    };
  }
}

export type IBankAccountFactory = InstanceType<typeof BankAccountFactory>;
export const bankAccountFactory = new BankAccountFactory();
