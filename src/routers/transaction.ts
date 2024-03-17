import { transactionController } from '@controllers/transaction';
import { bodyValidator } from '@middlewares/body-validator';
import { paramValidator } from '@middlewares/param-validator';
import { queryValidator } from '@middlewares/query-validator';
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
  queryValidator(findTransactionsQuerySchema),
  transactionController.index
);

router.post(
  '/',
  bodyValidator(createTransactionBodySchema),
  transactionController.store
);

router.put(
  '/:transactionId',
  paramValidator(transactionIdParamsSchema),
  bodyValidator(updateTransactionBodySchema),
  transactionController.update
);

router.delete(
  '/:transactionId',
  paramValidator(transactionIdParamsSchema),
  transactionController.delete
);

export { router };
