import { IFindTransactionsQuery } from '@interfaces/transaction';
import { ITransactionService, transactionService } from '@services/transaction';
import { Request, Response } from 'express';

class TransactionController {
  constructor(private readonly transactionService: ITransactionService) {
    this.findAllByUserId = this.findAllByUserId.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async findAllByUserId(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { year, month, bankAccountId, type } =
        req.query as unknown as IFindTransactionsQuery;

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

  public create(req: Request, res: Response) {
    try {
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ error: err.message });
    }
  }

  public update(req: Request, res: Response) {
    try {
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ error: err.message });
    }
  }

  public delete(req: Request, res: Response) {
    try {
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
