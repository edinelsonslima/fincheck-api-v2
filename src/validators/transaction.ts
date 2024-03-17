import { enTransactionType } from '@enums/transaction';
import { z } from 'zod';

export const createTransactionBodySchema = z.object({
  bankAccountId: z.string().uuid().min(1),
  categoryId: z.string().uuid().min(1),
  name: z.string().min(1),
  value: z.number().min(0),
  date: z.string().datetime(),
  type: z.enum([enTransactionType.EXPENSE, enTransactionType.INCOME]),
});

export const updateTransactionBodySchema = z.object({
  bankAccountId: z.string().uuid().min(1).optional(),
  categoryId: z.string().uuid().min(1).optional(),
  name: z.string().min(1).optional(),
  value: z.number().min(0).optional(),
  date: z.string().datetime().optional(),
  type: z
    .enum([enTransactionType.EXPENSE, enTransactionType.INCOME])
    .optional(),
});

export const findTransactionsQuerySchema = z.object({
  year: z.coerce.number().int().min(0),
  month: z.coerce.number().int().min(1).max(12),
  bankAccountId: z.string().uuid().min(1).optional(),
  type: z
    .enum([enTransactionType.EXPENSE, enTransactionType.INCOME])
    .optional(),
});

export const transactionIdParamsSchema = z.object({
  transactionId: z.string().uuid(),
});
