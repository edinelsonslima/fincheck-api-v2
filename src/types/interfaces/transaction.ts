import { enTransactionType } from '@enums/transaction';
import {
  createTransactionBodySchema,
  findTransactionsQuerySchema,
  transactionIdParamsSchema,
  updateTransactionBodySchema,
} from '@validators/transaction';
import { z } from 'zod';

export interface ITransactionMapperPersistence {
  id: string;
  user_id: string;
  category_id?: string;
  bank_account_id: string;
  name: string;
  value: number;
  date: string;
  type: string;
  created_at: string;
  updated_at: string;
}

export interface ITransaction {
  id: string;
  userId: string;
  categoryId?: string;
  bankAccountId: string;
  name: string;
  value: number;
  date: Date;
  type: enTransactionType;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateTransactionBody = z.infer<
  typeof createTransactionBodySchema
>;

export type IUpdateTransactionBody = z.infer<
  typeof updateTransactionBodySchema
>;

export type IFindTransactionsQuery = z.infer<
  typeof findTransactionsQuerySchema
>;

export type ITransactionIdParam = z.infer<typeof transactionIdParamsSchema>;
