import { bankAccountController } from '@controllers/bank-account';
import { validate } from '@middlewares/validate';
import {
  bankAccountIdParamsSchema,
  createBankAccountBodySchema,
  updateBankAccountBodySchema,
} from '@validators/bank-account';
import { Router } from 'express';

const router = Router();

router.get('/', bankAccountController.index);

router.get(
  '/:bankAccountId',
  validate('params', bankAccountIdParamsSchema),
  bankAccountController.show
);

router.post(
  '/',
  validate('body', createBankAccountBodySchema),
  bankAccountController.store
);

router.put(
  '/:bankAccountId',
  validate('params', bankAccountIdParamsSchema),
  validate('body', updateBankAccountBodySchema),
  bankAccountController.update
);

router.delete(
  '/:bankAccountId',
  validate('params', bankAccountIdParamsSchema),
  bankAccountController.delete
);

export { router };
