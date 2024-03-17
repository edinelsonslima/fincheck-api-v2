import { enBankAccountType } from '@enums/bank-account';
import {
  createBankAccountBodySchema,
  updateBankAccountBodySchema,
} from '@validators/bank-account';
import { z } from 'zod';
import { ITransaction } from './transaction';

export interface IBankAccountMapperPersistence {
  id: string;
  user_id: string;
  initial_balance: number;
  name: string;
  color: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface IBankAccount {
  id: string;
  userId: string;
  initialBalance: number;
  name: string;
  color: string;
  type: enBankAccountType;
  createdAt: Date;
  updatedAt: Date;
  transactions: ITransaction[];
}

export type ICreateBankAccountBody = z.infer<
  typeof createBankAccountBodySchema
>;

export type IUpdateBankAccountBody = z.infer<
  typeof updateBankAccountBodySchema
>;
