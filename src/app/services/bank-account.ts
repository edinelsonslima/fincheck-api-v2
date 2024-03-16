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
      currentBalance: transactions.reduce((acc, transaction) => {
        if (transaction.type === enTransactionType.INCOME) {
          acc + transaction.value;
        }

        if (transaction.type === enTransactionType.EXPENSE) {
          acc - transaction.value;
        }

        return acc;
      }, bankAccount.initialBalance),
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
}

export type IBankAccountService = InstanceType<typeof BankAccountService>;
export const bankAccountService = new BankAccountService(bankAccountRepository);
