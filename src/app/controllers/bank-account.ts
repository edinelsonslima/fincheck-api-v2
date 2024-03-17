import {
  IBankAccount,
  IBankAccountIdParams,
  ICreateBankAccountBody,
  IUpdateBankAccountBody,
} from '@interfaces/bank-account';
import { IRequest, IResponse } from '@interfaces/express';
import {
  IBankAccountService,
  bankAccountService,
} from '@services/bank-account';

class BankAccountController {
  constructor(private readonly bankAccountService: IBankAccountService) {
    this.findAllByUserId = this.findAllByUserId.bind(this);
    this.create = this.create.bind(this);
    this.findOneByUserIdAndBankAccountId =
      this.findOneByUserIdAndBankAccountId.bind(this);
    this.updateByUserIdAndBankAccountId =
      this.updateByUserIdAndBankAccountId.bind(this);
    this.deleteByUserIdAndBankAccountId =
      this.deleteByUserIdAndBankAccountId.bind(this);
  }

  public async findAllByUserId(req: IRequest, res: IResponse<IBankAccount[]>) {
    try {
      const bankAccounts = await this.bankAccountService.findAllByUserId(
        req.userId
      );

      return res.status(200).json(bankAccounts);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async create(
    req: IRequest<ICreateBankAccountBody>,
    res: IResponse<IBankAccount>
  ) {
    try {
      const bankAccount = await this.bankAccountService.create(
        req.userId,
        req.body
      );

      return res.status(201).json(bankAccount);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async findOneByUserIdAndBankAccountId(
    req: IRequest<unknown, IBankAccountIdParams>,
    res: IResponse<IBankAccount>
  ) {
    try {
      const bankAccount =
        await this.bankAccountService.findOneByUserIdAndBankAccountId(
          req.userId,
          req.params.bankAccountId
        );

      return res.status(200).json(bankAccount);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async updateByUserIdAndBankAccountId(
    req: IRequest<IUpdateBankAccountBody, IBankAccountIdParams>,
    res: IResponse<IBankAccount>
  ) {
    try {
      const bankAccount =
        await this.bankAccountService.updateByUserIdAndBankAccountId(
          req.userId,
          req.params.bankAccountId,
          req.body
        );

      return res.status(200).json(bankAccount);
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }

  public async deleteByUserIdAndBankAccountId(
    req: IRequest<unknown, IBankAccountIdParams>,
    res: IResponse<void>
  ) {
    try {
      await this.bankAccountService.deleteByUserIdAndBankAccountId(
        req.userId,
        req.params.bankAccountId
      );

      return res.status(204).send();
    } catch (error: any) {
      const err: Error = error;
      return res.status(500).json({ message: err.message });
    }
  }
}

export type IBankAccountController = InstanceType<typeof BankAccountController>;
export const bankAccountController = new BankAccountController(
  bankAccountService
);
