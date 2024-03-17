import {
  IFindTransactionsQuery,
  ITransactionIdParam,
  IUpdateTransactionBody,
} from '@interfaces/transaction';
import { ITransactionService, transactionService } from '@services/transaction';
import { Request, Response } from 'express';

class TransactionController {
  constructor(private readonly transactionService: ITransactionService) {
    this.findAllByUserId = this.findAllByUserId.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async findAllByUserId(
    req: Request<any, any, any, IFindTransactionsQuery>,
    res: Response
  ) {
    try {
      const userId = req.userId;
      const { year, month, bankAccountId, type } = req.query;

      const transactions = await this.transactionService.findAllByUserId(
        userId,
        { year, month, bankAccountId, type }
      );

      return res.status(200).json(transactions);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ error: err.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { bankAccountId, categoryId, date, name, type, value } = req.body;

      const transaction = await this.transactionService.create(userId, {
        bankAccountId,
        categoryId,
        date,
        name,
        type,
        value,
      });

      return res.status(201).json(transaction);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ error: err.message });
    }
  }

  public async update(
    req: Request<ITransactionIdParam, any, IUpdateTransactionBody>,
    res: Response
  ) {
    try {
      const userId = req.userId;
      const { transactionId } = req.params;
      const { bankAccountId, categoryId, date, name, type, value } = req.body;

      const transaction = await this.transactionService.update(
        userId,
        transactionId,
        { bankAccountId, categoryId, date, name, type, value }
      );

      return res.status(200).json(transaction);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ error: err.message });
    }
  }

  public async delete(req: Request<ITransactionIdParam>, res: Response) {
    try {
      const userId = req.userId;
      const { transactionId } = req.params;

      await this.transactionService.delete(userId, transactionId);

      return res.status(204).send();
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ error: err.message });
    }
  }
}

export type ITransactionController = InstanceType<typeof TransactionController>;
export const transactionController = new TransactionController(
  transactionService
);
