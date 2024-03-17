import { transactionController } from '@controllers/transaction';
import { validate } from '@middlewares/validate';
import {
  createTransactionBodySchema,
  findTransactionsQuerySchema,
  transactionIdParamsSchema,
  updateTransactionBodySchema,
} from '@validators/transaction';
import { Router } from 'express';

const router = Router();

router.get(
  '/',
  validate('query', findTransactionsQuerySchema),
  transactionController.index
);

router.post(
  '/',
  validate('body', createTransactionBodySchema),
  transactionController.store
);

router.put(
  '/:transactionId',
  validate('params', transactionIdParamsSchema),
  validate('body', updateTransactionBodySchema),
  transactionController.update
);

router.delete(
  '/:transactionId',
  validate('params', transactionIdParamsSchema),
  transactionController.delete
);

export { router };
