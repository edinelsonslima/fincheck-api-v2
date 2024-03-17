import { bankAccountController } from '@controllers/bank-account';
import {
  bankAccountIdParamsSchema,
  createBankAccountBodySchema,
  updateBankAccountBodySchema,
} from '@validators/bank-account';
import { Router } from 'express';
import { validate } from 'middleware/validators';

const router = Router();

router.get('/', bankAccountController.index);

router.get(
  '/:bankAccountId',
  validate.param(bankAccountIdParamsSchema),
  bankAccountController.show
);

router.post(
  '/',
  validate.body(createBankAccountBodySchema),
  bankAccountController.store
);

router.put(
  '/:bankAccountId',
  validate.param(bankAccountIdParamsSchema),
  validate.body(updateBankAccountBodySchema),
  bankAccountController.update
);

router.delete(
  '/:bankAccountId',
  validate.param(bankAccountIdParamsSchema),
  bankAccountController.delete
);

export { router };
