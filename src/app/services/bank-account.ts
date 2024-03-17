import { enTransactionType } from '@enums/transaction';
import {
  ICreateBankAccountBody,
  IUpdateBankAccountBody,
} from '@interfaces/bank-account';
import {
  IBankAccountRepository,
  bankAccountRepository,
} from '@repositories/bank-account';

class BankAccountService {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}

  public async findAllByUserId(userId: string) {
    const bankAccounts =
      await this.bankAccountRepository.findAllByUserId(userId);

    if (!bankAccounts) {
      return [];
    }

    return bankAccounts.map((bankAccount) => ({
      ...bankAccount,
      currentBalance: bankAccount.transactions?.reduce((acc, transaction) => {
        if (transaction.type === enTransactionType.INCOME) {
          acc += transaction.value;
        }

        if (transaction.type === enTransactionType.EXPENSE) {
          acc -= transaction.value;
        }

        return acc;
      }, bankAccount.initialBalance),
    }));
  }

  public async create(userId: string, data: ICreateBankAccountBody) {
    const bankAccount = await this.bankAccountRepository.create(userId, data);

    if (!bankAccount) {
      throw new Error('bank account not created');
    }

    return bankAccount;
  }

  public async findOneByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string
  ) {
    const bankAccount =
      await this.bankAccountRepository.findOneByUserIdAndBankAccountId(
        userId,
        bankAccountId
      );

    if (!bankAccount) {
      throw new Error('bank account not found');
    }

    return bankAccount;
  }

  public async updateByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string,
    data: IUpdateBankAccountBody
  ) {
    const bankAccount =
      await this.bankAccountRepository.updateByUserIdAndBankAccountId(
        userId,
        bankAccountId,
        data
      );

    if (!bankAccount) {
      throw new Error('bank account not updated');
    }

    return bankAccount;
  }

  public async deleteByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string
  ) {
    const bankAccount =
      await this.bankAccountRepository.deleteByUserIdAndBankAccountId(
        userId,
        bankAccountId
      );

    if (!bankAccount) {
      throw new Error('bank account not deleted');
    }
  }
}

export type IBankAccountService = InstanceType<typeof BankAccountService>;
export const bankAccountService = new BankAccountService(bankAccountRepository);
