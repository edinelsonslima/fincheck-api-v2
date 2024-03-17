import { IFindTransactionsQuery } from '@interfaces/transaction';
import {
  ITransactionRepository,
  transactionRepository,
} from '@repositories/transaction';

class TransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  public findAllByUserId(
    userId: string,
    { month, year, bankAccountId, type }: IFindTransactionsQuery
  ) {
    return this.transactionRepository.findAllByUserId(userId, {
      month,
      year,
      bankAccountId,
      type,
    });
  }
}

export type ITransactionService = InstanceType<typeof TransactionService>;
export const transactionService = new TransactionService(transactionRepository);
