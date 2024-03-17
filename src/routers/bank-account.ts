import { bankAccountController } from '@controllers/bank-account';
import { bodyValidator } from '@middlewares/body-validator';
import { paramValidator } from '@middlewares/param-validator';
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
  paramValidator(bankAccountIdParamsSchema),
  bankAccountController.show
);

router.post(
  '/',
  bodyValidator(createBankAccountBodySchema),
  bankAccountController.store
);

router.put(
  '/:bankAccountId',
  paramValidator(bankAccountIdParamsSchema),
  bodyValidator(updateBankAccountBodySchema),
  bankAccountController.update
);

router.delete(
  '/:bankAccountId',
  paramValidator(bankAccountIdParamsSchema),
  bankAccountController.delete
);

export { router };
