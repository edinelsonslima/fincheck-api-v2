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

  public async findAllByUserId(userId: string, data: IFindTransactionsQuery) {
    const transactions = await this.transactionRepository.findAllByUserId(
      userId,
      data
    );

    return transactions ?? [];
  }

  public async create(userId: string, data: ICreateTransactionBody) {
    const transaction = await this.transactionRepository.create(userId, data);

    if (!transaction) {
      throw new Error('transaction not created');
    }

    return transaction;
  }

  public async update(
    userId: string,
    transactionId: string,
    data: IUpdateTransactionBody
  ) {
    const transaction = await this.transactionRepository.update(
      userId,
      transactionId,
      data
    );

    if (!transaction) {
      throw new Error('transaction not updated');
    }

    return transaction;
  }

  public async delete(userId: string, transactionId: string) {
    const transaction = await this.transactionRepository.delete(
      userId,
      transactionId
    );

    if (!transaction) {
      throw new Error('transaction not deleted');
    }
  }
}

export type ITransactionService = InstanceType<typeof TransactionService>;
export const transactionService = new TransactionService(transactionRepository);
