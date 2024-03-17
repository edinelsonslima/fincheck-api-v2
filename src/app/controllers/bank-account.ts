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
    this.index = this.index.bind(this);
    this.store = this.store.bind(this);
    this.show = this.show.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  public async index(req: IRequest, res: IResponse<IBankAccount[]>) {
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

  public async store(
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

  public async show(
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

  public async update(
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

  public async delete(
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
