import {
  IBankAccountService,
  bankAccountService,
} from '@services/bank-account';
import { Request, Response } from 'express';

class BankAccountController {
  constructor(private readonly bankAccountService: IBankAccountService) {
    this.findAllByUserId = this.findAllByUserId.bind(this);
  }

  public findAllByUserId(req: Request, res: Response) {
    try {
      const userId = req.userId;

      const bankAccounts = this.bankAccountService.findAllByUserId(userId);

      return res.status(200).json(bankAccounts);
    } catch (error: any) {
      const err: Error = error;
      res.status(500).json({ error: err.message });
    }
  }
}

export type IBankAccountController = InstanceType<typeof BankAccountController>;
export const bankAccountController = new BankAccountController(
  bankAccountService
);
