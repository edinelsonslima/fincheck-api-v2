import { enBankAccountType } from '@enums/bank-account';
import { z } from 'zod';

const createBankAccountBodySchema = z.object({
  name: z.string().min(1),
  color: z.string().min(4).max(9).regex(/^#/),
  initialBalance: z.number().min(0),
  type: z.enum([
    enBankAccountType.CASH,
    enBankAccountType.CHECKING,
    enBankAccountType.INVESTMENT,
  ]),
});

const bankAccountIdParamsSchema = z.object({
  bankAccountId: z.string().uuid(),
});

export { bankAccountIdParamsSchema, createBankAccountBodySchema };
