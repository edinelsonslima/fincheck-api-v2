import {
  IBankAccountService,
  bankAccountService,
} from '@services/bank-account';
import { Request, Response } from 'express';

class BankAccountController {
  constructor(private readonly bankAccountService: IBankAccountService) {
    this.findAllByUserId = this.findAllByUserId.bind(this);
    this.create = this.create.bind(this);
    this.findOneByUserIdAndBankAccountId =
      this.findOneByUserIdAndBankAccountId.bind(this);
    this.updateByUserIdAndBankAccountId =
      this.updateByUserIdAndBankAccountId.bind(this);
  }

  public async findAllByUserId(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const bankAccounts =
        await this.bankAccountService.findAllByUserId(userId);

      return res.status(200).json(bankAccounts);
    } catch (error: any) {
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { color, initialBalance, name, type } = req.body;

      const bankAccount = await this.bankAccountService.create(userId, {
        color,
        initialBalance,
        name,
        type,
      });

      return res.status(201).json(bankAccount);
    } catch (error: any) {
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }

  public async findOneByUserIdAndBankAccountId(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const bankAccountId = req.params.bankAccountId;

      const bankAccount =
        await this.bankAccountService.findOneByUserIdAndBankAccountId(
          userId,
          bankAccountId
        );

      return res.status(200).json(bankAccount);
    } catch (error: any) {
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }

  public async updateByUserIdAndBankAccountId(req: Request, res: Response) {
    try {
      const userId = req.userId;
      const { bankAccountId } = req.params;
      const { color, initialBalance, name, type } = req.body;

      const bankAccount =
        await this.bankAccountService.updateByUserIdAndBankAccountId(
          userId,
          bankAccountId,
          { color, initialBalance, name, type }
        );

      return res.status(200).json(bankAccount);
    } catch (error: any) {
      console.log(error);
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }
}

export type IBankAccountController = InstanceType<typeof BankAccountController>;
export const bankAccountController = new BankAccountController(
  bankAccountService
);
