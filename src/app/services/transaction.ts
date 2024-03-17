import {
  ICreateTransactionBody,
  IFindTransactionsQuery,
  IUpdateTransactionBody,
} from '@interfaces/transaction';
import {
  ITransactionRepository,
  transactionRepository,
} from '@repositories/transaction';

class TransactionService {
  constructor(private readonly transactionRepository: ITransactionRepository) {}

  public async findAllByUserId(
    userId: string,
    { month, year, bankAccountId, type }: IFindTransactionsQuery
  ) {
    const transactions = await this.transactionRepository.findAllByUserId(
      userId,
      { month, year, bankAccountId, type }
    );

    return transactions ?? [];
  }

  public async create(
    userId: string,
    {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    }: ICreateTransactionBody
  ) {
    return this.transactionRepository.create(userId, {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    });
  }

  public update(
    userId: string,
    transactionId: string,
    {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    }: IUpdateTransactionBody
  ) {
    return this.transactionRepository.update(userId, transactionId, {
      bankAccountId,
      categoryId,
      date,
      name,
      type,
      value,
    });
  }

  public async delete(userId: string, transactionId: string) {
    const transaction = await this.transactionRepository.delete(
      userId,
      transactionId
    );

    if (!transaction) {
      throw new Error('Transaction not found');
    }
  }
}

export type ITransactionService = InstanceType<typeof TransactionService>;
export const transactionService = new TransactionService(transactionRepository);
