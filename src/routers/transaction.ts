import { transactionController } from '@controllers/transaction';
import {
  createTransactionBodySchema,
  findTransactionsQuerySchema,
  transactionIdParamsSchema,
  updateTransactionBodySchema,
} from '@validators/transaction';
import { Router } from 'express';
import { validate } from 'middleware/validators';

const router = Router();

router.get(
  '/',
  validate.query(findTransactionsQuerySchema),
  transactionController.findAllByUserId
);

router.post(
  '/',
  validate.body(createTransactionBodySchema),
  transactionController.create
);

router.put(
  '/:transactionId',
  validate.param(transactionIdParamsSchema),
  validate.body(updateTransactionBodySchema),
  transactionController.update
);

router.delete(
  '/:transactionId',
  validate.param(transactionIdParamsSchema),
  transactionController.delete
);

export { router };
