import { IRequest, IResponse } from '@interfaces/express';
import {
  ICreateTransactionBody,
  IFindTransactionsQuery,
  ITransaction,
  ITransactionIdParam,
  IUpdateTransactionBody,
} from '@interfaces/transaction';
import { ITransactionService, transactionService } from '@services/transaction';

class TransactionController {
  constructor(private readonly transactionService: ITransactionService) {
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(
    req: IRequest<unknown, unknown, IFindTransactionsQuery>,
    res: IResponse<ITransaction[]>
  ) {
    try {
      const transactions = await this.transactionService.findAllByUserId(
        req.userId,
        req.query
      );

      return res.status(200).json(transactions);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async store(
    req: IRequest<ICreateTransactionBody>,
    res: IResponse<ITransaction>
  ) {
    try {
      const transaction = await this.transactionService.create(
        req.userId,
        req.body
      );

      return res.status(201).json(transaction);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async update(
    req: IRequest<IUpdateTransactionBody, ITransactionIdParam>,
    res: IResponse<ITransaction>
  ) {
    try {
      const transaction = await this.transactionService.update(
        req.userId,
        req.params.transactionId,
        req.body
      );

      return res.status(200).json(transaction);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async delete(
    req: IRequest<unknown, ITransactionIdParam>,
    res: IResponse<void>
  ) {
    try {
      await this.transactionService.delete(
        req.userId,
        req.params.transactionId
      );

      return res.status(204).send();
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }
}

export type ITransactionController = InstanceType<typeof TransactionController>;
export const transactionController = new TransactionController(
  transactionService
);
