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
    const transactions = await this.transactionService.findAllByUserId(
      req.userId,
      req.query
    );

    return res.status(200).json(transactions);
  }

  public async store(
    req: IRequest<ICreateTransactionBody>,
    res: IResponse<ITransaction>
  ) {
    const transaction = await this.transactionService.create(
      req.userId,
      req.body
    );

    return res.status(201).json(transaction);
  }

  public async update(
    req: IRequest<IUpdateTransactionBody, ITransactionIdParam>,
    res: IResponse<ITransaction>
  ) {
    const transaction = await this.transactionService.update(
      req.userId,
      req.params.transactionId,
      req.body
    );

    return res.status(200).json(transaction);
  }

  public async delete(
    req: IRequest<unknown, ITransactionIdParam>,
    res: IResponse<void>
  ) {
    await this.transactionService.delete(req.userId, req.params.transactionId);
    return res.status(204).send();
  }
}

export type ITransactionController = InstanceType<typeof TransactionController>;
export const transactionController = new TransactionController(
  transactionService
);
