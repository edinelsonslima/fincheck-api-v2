import { enTransactionType } from '@enums/transaction';
import { ICreateBankAccountBody } from '@interfaces/bank-account';
import {
  IBankAccountRepository,
  bankAccountRepository,
} from '@repositories/bank-account';

class BankAccountService {
  constructor(private readonly bankAccountRepository: IBankAccountRepository) {}

  public async findAllByUserId(userId: string) {
    const bankAccounts =
      await this.bankAccountRepository.findAllByUserId(userId);

    return bankAccounts?.map(({ transactions, ...bankAccount }) => ({
      ...bankAccount,
      currentBalance: transactions?.reduce((acc, transaction) => {
        console.log(acc, transaction?.value);
        if (transaction.type === enTransactionType.INCOME) {
          acc + (transaction?.value ?? 0);
        }

        if (transaction.type === enTransactionType.EXPENSE) {
          acc - (transaction?.value ?? 0);
        }

        return acc;
      }, bankAccount?.initialBalance ?? 0),
    }));
  }

  public create(
    userId: string,
    { color, initialBalance, name, type }: ICreateBankAccountBody
  ) {
    return this.bankAccountRepository.create({
      color,
      initialBalance,
      name,
      type,
      userId,
    });
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
      throw new Error('Bank account not found');
    }

    return bankAccount;
  }

  public async updateByUserIdAndBankAccountId(
    userId: string,
    bankAccountId: string,
    { color, initialBalance, name, type }: ICreateBankAccountBody
  ) {
    const bankAccount =
      await this.bankAccountRepository.updateByUserIdAndBankAccountId(
        userId,
        bankAccountId,
        { color, initialBalance, name, type }
      );

    if (!bankAccount) {
      throw new Error('Bank account not found');
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
      throw new Error('Bank account not found');
    }
  }
}

export type IBankAccountService = InstanceType<typeof BankAccountService>;
export const bankAccountService = new BankAccountService(bankAccountRepository);
