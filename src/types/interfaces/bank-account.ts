import { enBankAccountType } from '@enums/bank-account';
import {
  createBankAccountBodySchema,
  updateBankAccountBodySchema,
} from '@validators/bank-account';
import { z } from 'zod';
import { ITransaction } from './transaction';

export interface IBankAccount {
  id: string;
  userId: string;
  initialBalance: number;
  name: string;
  color: string;
  type: enBankAccountType;

  createdAt: Date;
  updatedAt: Date;
}

export interface IBankAccountMapperPersistence {
  id: string[] | string;
  user_id: string[] | string;
  initial_balance: number;
  name: string[] | string;
  color: string;
  type: string[] | string;
  created_at: string[] | string;
  updated_at: string[] | string;
  category_id: string;
  bank_account_id: string;
  value: number[] | number;
  date: string;
}

export interface IBankAccountMapperDomain extends IBankAccount {
  transactions: ITransaction[];
}

export type ICreateBankAccountBody = z.infer<
  typeof createBankAccountBodySchema
>;

export type IUpdateBankAccountBody = z.infer<
  typeof updateBankAccountBodySchema
>;
