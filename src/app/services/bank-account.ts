import { enTransactionType } from '@enums/transaction';
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
}

export type IBankAccountService = InstanceType<typeof BankAccountService>;
export const bankAccountService = new BankAccountService(bankAccountRepository);
