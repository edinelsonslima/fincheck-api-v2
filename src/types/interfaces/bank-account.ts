import { enBankAccountType } from '@enums/bank-account';
import { createBankAccountBodySchema } from '@validators/bank-account';
import { z } from 'zod';
import { ITransaction } from './transaction';
import { IUser } from './user';

export interface IBankAccount {
  id: string;
  userId: string;
  initialBalance: number;
  name: string;
  color: string;
  type: enBankAccountType;

  created_at: Date;
  updated_at: Date;

  user: IUser;
  transactions: ITransaction[];
}

export type ICreateBankAccountBody = z.infer<
  typeof createBankAccountBodySchema
>;
